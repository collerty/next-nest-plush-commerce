import {Controller, Get, Post, Body, Patch, Param, Delete, Req} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {CreateOrderDto} from './dto/create-order.dto';
import {UpdateOrderDto} from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
    const userId: number = req.user.id;
    return this.ordersService.createOrder(createOrderDto, userId);
  }

  @Get()
  findAll(@Req() req: any) {
    const userId: number = req.user.id;
    return this.ordersService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @Req() req: any) {
    const userId = req.user.id;
    return this.ordersService.update(+id, updateOrderDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
