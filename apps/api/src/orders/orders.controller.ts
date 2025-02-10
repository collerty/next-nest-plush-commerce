import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Delete, Get, Param, Patch, Post, Req} from "@nestjs/common";
import {CreateOrderDto} from "./dto/create-order.dto";
import {OrdersService} from "./orders.service";
import {UpdateOrderDto} from "./dto/update-order.dto";

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
  }

  @Post()
  @ApiOperation({summary: 'Create a new order'})
  @ApiResponse({status: 201, description: 'Order created successfully.'})
  @ApiResponse({status: 400, description: 'Invalid input data.'})
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
    const userId: number = req.user.id;
    return this.ordersService.createOrder(createOrderDto, userId);
  }

  @Get()
  @ApiOperation({summary: 'Get all orders for a user'})
  @ApiResponse({status: 200, description: 'Returns a list of all orders.'})
  findAll(@Req() req: any) {
    const userId: number = req.user.id;
    return this.ordersService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({summary: 'Get a single order by ID'})
  @ApiResponse({status: 200, description: 'Returns the specified order.'})
  @ApiResponse({status: 404, description: 'Order not found.'})
  async findOne(
      @Param('id') id: string,
      @Req() req: any
  ) {
    console.log(req.user);
    const userId = req.user.id;
    return this.ordersService.findOne(+id, userId);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update an existing order'})
  @ApiResponse({status: 200, description: 'Order updated successfully.'})
  @ApiResponse({status: 404, description: 'Order not found.'})
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @Req() req: any) {
    const userId = req.user.id;
    return this.ordersService.update(+id, updateOrderDto, userId);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Remove an order'})
  @ApiResponse({status: 200, description: 'Order deleted successfully.'})
  @ApiResponse({status: 404, description: 'Order not found.'})
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
