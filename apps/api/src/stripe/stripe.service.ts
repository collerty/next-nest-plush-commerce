import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import Stripe from 'stripe';
import {ProductsService} from "../products/products.service";
import {CreateCheckoutSessionDto} from "./dto/createCheckoutSession.dto";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
      @Inject('STRIPE_API_KEY') private readonly apiKey: string,
      private readonly productsService: ProductsService,
      private readonly configService: ConfigService
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
    // Fetch product details from your database
    const lineItems = await Promise.all(
        createCheckoutSessionDto.items.map(async (item) => {
          const product = await this.productsService.findOne(item.productId);
          return {
            price_data: {
              currency: 'eur',
              product_data: {
                name: product.name,
                description: product.description,
                // Add other product details as needed
              },
              unit_amount: product.price * 100, // Stripe expects the amount in cents
            },
            quantity: item.quantity,
          };
        }),
    );

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${this.configService.get<string>('NEXT_URL_PRODUCTION')}/payment/success`,
      cancel_url: `${this.configService.get<string>('NEXT_URL_PRODUCTION')}/payment/cancel`,
      customer_email: createCheckoutSessionDto.customerEmail
    });
    return {sessionId: session.id};
  }

}