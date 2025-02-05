import {Body, Controller, Get, Post} from '@nestjs/common';
import {StripeService} from './stripe.service';
import {CreateCheckoutSessionDto} from "./dto/createCheckoutSession.dto";
import {Public} from "../auth/public.decorator";

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {
  }

  // @Get('products')
  // async getProducts() {
  //   return await this.stripeService.getProducts();
  // }
  //
  // @Get('customers')
  // async getCustomers() {
  //   return await this.stripeService.getCustomers();
  // }

  // @Public()
  // @Post('webhook')
  // async handleStripeWebhook(
  //     @Body() body: any,
  //     @Headers('stripe-signature') sig: string
  // ) {
  //     return this.stripeService.handleWebhook(body, sig);
  // }

  @Public()
  @Post('checkout')
  async createCheckoutSession(@Body() createCheckoutSessionDTO: CreateCheckoutSessionDto) {
    return this.stripeService.createCheckoutSession(createCheckoutSessionDTO);
  }
}