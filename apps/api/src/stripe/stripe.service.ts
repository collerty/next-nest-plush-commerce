import {BadRequestException, Inject, Injectable, Logger} from '@nestjs/common';
import Stripe from 'stripe';
import {ProductsService} from "../products/products.service";
import {CreateCheckoutSessionDto} from "./dto/createCheckoutSession.dto";
import {ConfigService} from "@nestjs/config";
import {OrdersService} from "../orders/orders.service";
import {OrderStatus} from "../orders/entities/order.entity";

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);

  constructor(
      @Inject('STRIPE_API_KEY') private readonly apiKey: string,
      private readonly productsService: ProductsService,
      private readonly ordersService: OrdersService,
      private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2025-01-27.acacia',
    });
  }

  async getProducts(): Promise<Stripe.Product[]> {
    const products = await this.stripe.products.list();
    return products.data;
  }

  async getCustomers() {
    const customers = await this.stripe.customers.list({});
    return customers.data;
  }

  async createCheckoutSession(createCheckoutSessionDto: CreateCheckoutSessionDto) {
    const products = await Promise.all(
        createCheckoutSessionDto.items.map(async (item) => {
          const product = await this.productsService.findOne(item.productId);
          return {
            productId: product.id,
            name: product.name,
            description: product.description,
            price: product.price, // Store price here
            quantity: item.quantity,
          };
        })
    );


    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: product.name,
          description: product.description,
        },
        unit_amount: product.price * 100, // Stripe expects amount in cents
      },
      quantity: product.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${this.configService.get<string>('NEXT_URL_PRODUCTION')}/payment/success`,
      cancel_url: `${this.configService.get<string>('NEXT_URL_PRODUCTION')}/payment/cancel`,
      customer_email: createCheckoutSessionDto.customerEmail,
      metadata: {
        orderItems: JSON.stringify(
            products.map((product) => ({
              productId: product.productId,
              quantity: product.quantity,
              pricePerUnit: product.price,
            }))
        ),
      },
    });

    return { sessionId: session.id };
  }

  async handleStripeWebhook(rawBody: Buffer, sig: string) {
    const secret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');

    if (!secret) {
      throw new BadRequestException('Stripe webhook secret is not defined');
    }

    let event: Stripe.Event;

    try {
      // Construct and verify the event from Stripe using the secret
      event = this.stripe.webhooks.constructEvent(rawBody, sig, secret);
    } catch (err) {
      this.logger.error('Webhook signature verification failed', err);
      throw new BadRequestException('Webhook signature verification failed');
    }

    // Handle the checkout session completed event
      console.log(event.type);
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      return this.handleCheckoutSessionCompleted(session);
    }

    // Other event types can be handled as needed
    this.logger.warn(`Unhandled event type: ${event.type}`);
  }

  // Logic to create or update an order after a successful checkout session
  async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    const { customer_email, id } = session;
    if (!session.metadata || !session.metadata.orderItems) {
      throw new BadRequestException('No orderItems in session metadata');
    }
    const orderItems = JSON.parse(session.metadata.orderItems);
    console.log(session);
    // Check if an order already exists with this session ID
    let order = await this.ordersService.findOrderBySessionId(id);
    console.log(order);
    if (!order) {
      // If no order exists, create a new order
      console.log("create order");
      const lineItems = await this.stripe.checkout.sessions.listLineItems(
          session.id
      );

      order = await this.ordersService.createOrderFromStripeSession(id, customer_email, orderItems, lineItems);
    } else {
      // Update existing order if necessary
      order.status = OrderStatus.PAID;
      await this.ordersService.updateOrderWithPaymentStatus(order.id, OrderStatus.PAID);
    }

    return order;
  }

  constructEvent(payload: string, sig: string, secret: string): Stripe.Event {
    return this.stripe.webhooks.constructEvent(payload, sig, secret);
  }
}