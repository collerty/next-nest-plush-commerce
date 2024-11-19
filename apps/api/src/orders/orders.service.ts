import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateOrderDto} from './dto/create-order.dto';
import {UpdateOrderDto} from './dto/update-order.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Order, OrderStatus} from "./entities/order.entity";
import {OrderItem} from "./entities/order-item.entity";
import {Repository} from "typeorm";
import {CreateOrderItemDto} from "./dto/create-order-item.dto";
import {use} from "passport";

@Injectable()
export class OrdersService {
  constructor(
      @InjectRepository(Order)
      private readonly ordersRepository: Repository<Order>,
      @InjectRepository(OrderItem)
      private readonly orderItemsRepository: Repository<OrderItem>
  ) {
  }

  async createOrder(createOrderDto: CreateOrderDto, userId: number): Promise<Order> {
    const {items} = createOrderDto;
    const defaultStatus = OrderStatus.PENDING;
    const order = this.ordersRepository.create({
      status: defaultStatus,
      user: {id: userId}
    });
    const savedOrder = await this.ordersRepository.save(order);

    const orderItems = items.map((item) => {
      return this.orderItemsRepository.create({
        order: savedOrder,
        product: {id: item.productId},
        quantity: item.quantity,
        pricePerUnit: item.pricePerUnit
      })
    })

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
        // user: {id: userId}
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
}
