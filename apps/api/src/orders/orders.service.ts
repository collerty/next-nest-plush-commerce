import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateOrderDto} from './dto/create-order.dto';
import {UpdateOrderDto} from './dto/update-order.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Order, OrderStatus} from "./entities/order.entity";
import {OrderItem} from "./entities/order-item.entity";
import {Repository} from "typeorm";
import {Product} from "../products/entities/product.entity";
import {UsersService} from "../users/users.service";

@Injectable()
export class OrdersService {
  constructor(
      @InjectRepository(Order)
      private readonly ordersRepository: Repository<Order>,
      @InjectRepository(OrderItem)
      private readonly orderItemsRepository: Repository<OrderItem>,
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,
      private readonly usersService: UsersService
  ) {
  }

  async createOrder(createOrderDto: CreateOrderDto, userId: number, status: OrderStatus = OrderStatus.PENDING): Promise<Order> {
    const {items} = createOrderDto;
    // const defaultStatus = OrderStatus.PENDING;

    const order = this.ordersRepository.create({
      status: status,
      user: {id: userId},
    });

    const savedOrder = await this.ordersRepository.save(order);

    const orderItems = await Promise.all(items.map(async (item) => {
      const product = await this.productRepository.findOne({where: {id: item.productId}});
      if (!product) {
        throw new NotFoundException(`Product with ID ${item.productId} not found`);
      }

      return this.orderItemsRepository.create({
        order: savedOrder,
        product,
        quantity: item.quantity,
        pricePerUnit: item.pricePerUnit,
      });
    }));

    await this.orderItemsRepository.save(orderItems);

    const fullOrder = await this.ordersRepository.findOne({
      where: {id: savedOrder.id},
      relations: ['items', 'items.product'],
    });

    if (!fullOrder) {
      throw new Error('Order not found');
    }

    return fullOrder;
  }

  async createOrderByEmail(createOrderDto: CreateOrderDto, customerEmail: string, status: OrderStatus = OrderStatus.PENDING): Promise<Order> {
    const {items, sessionId} = createOrderDto;
    // const defaultStatus = OrderStatus.PENDING;

    // Look up the user by email
    const user = await this.usersService.findOneByEmail(customerEmail);
    if (!user) {
      throw new NotFoundException(`User with email ${customerEmail} not found`);
    }

    // Create the order with the found user
    const order = this.ordersRepository.create({
      status: status,
      user: user,
      sessionId: sessionId
    });

    const savedOrder = await this.ordersRepository.save(order);

    const orderItems = await Promise.all(
        items.map(async (item) => {
          const product = await this.productRepository.findOne({where: {id: item.productId}});
          if (!product) {
            throw new NotFoundException(`Product with ID ${item.productId} not found`);
          }

          return this.orderItemsRepository.create({
            order: savedOrder,
            product,
            quantity: item.quantity,
            pricePerUnit: item.pricePerUnit,
          });
        })
    );

    console.log(user, order, orderItems)
    await this.orderItemsRepository.save(orderItems);

    const fullOrder = await this.ordersRepository.findOne({
      where: {id: savedOrder.id},
      relations: ['items', 'items.product'],
    });

    if (!fullOrder) {
      throw new Error('Order not found');
    }

    return fullOrder;
  }


  findAll(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: {
        user: {id: userId},
      },
      relations: ['items', 'items.product'],
    });
  }


  async findOne(id: number) {
    const order = await this.ordersRepository.findOne({
          where: {id},
          relations: ['items', 'items.product']
        }
    );
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(orderId: number, updateOrderDto: UpdateOrderDto, userId: number) {
    const order = await this.ordersRepository.findOne({
      where: {
        id: orderId,
        user: {id: userId}
      }
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    if (updateOrderDto.status) {
      order.status = updateOrderDto.status;
    }

    return this.ordersRepository.save(order);
  }

  async remove(id: number) {
    const result = await this.ordersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }

  async updateOrderWithPaymentStatus(orderId: number, paymentStatus: OrderStatus): Promise<Order> {
    const order = await this.ordersRepository.findOne({where: {id: orderId}});
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    order.status = paymentStatus; // Update with payment status (e.g., 'PAID', 'FAILED')
    return this.ordersRepository.save(order);
  }

  async findOrderBySessionId(sessionId: string): Promise<Order | null> {
    return this.ordersRepository.findOne({
      where: {sessionId},
      relations: ['items', 'items.product'],
    });
  }

  async createOrderFromStripeSession(
      sessionId: string,
      customerEmail: string | null,
      orderItems: { productId: number; quantity: number, pricePerUnit: number }[],
      lineItems: { data: any[] }
  ): Promise<any> {
    console.log("Creating order from Stripe session");
    console.log({customerEmail, orderItems});

    if (!customerEmail) {
      throw new BadRequestException('Customer email not provided in Stripe session');
    }

    if (!lineItems || !lineItems.data) {
      throw new BadRequestException('Line items not found in Stripe session');
    }
    console.log(orderItems);
    const createOrderDto: CreateOrderDto = {
      items: orderItems.map((orderItem) => {

        return {
          productId: orderItem.productId,
          quantity: orderItem.quantity,
          pricePerUnit: orderItem.pricePerUnit,
        };
      }),
      sessionId: sessionId,
    };

    console.log("Final Order DTO:", createOrderDto);

    // Create order in database
    const order = await this.createOrderByEmail(createOrderDto, customerEmail, OrderStatus.PAID);
    return order;
  }

}
