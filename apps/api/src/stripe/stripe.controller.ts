import {Body, Controller, Get, HttpCode, HttpStatus, Post, RawBodyRequest, Req, Headers} from '@nestjs/common';
import {StripeService} from './stripe.service';
import {CreateCheckoutSessionDto} from "./dto/createCheckoutSession.dto";
import {Public} from "../auth/public.decorator";
import Stripe from "stripe";

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

  @Public()
  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleStripeWebhook(@Headers("stripe-signature") sig: string, @Req() req: Request) {
    // const sig = req.headers.get('stripe-signature');

    if (!sig) {
      throw new Error('Stripe signature is missing');
    }

    const rawBody = (req as any).rawBody; // Ensure rawBody is accessible

    if (!rawBody) {
      throw new Error('Raw body is missing. Ensure body parser is set up correctly.');
    }
    console.log(sig);
    return this.stripeService.handleStripeWebhook(rawBody, sig);
  }
  @Public()
  @Post('checkout')
  async createCheckoutSession(@Body() createCheckoutSessionDTO: CreateCheckoutSessionDto) {
    return this.stripeService.createCheckoutSession(createCheckoutSessionDTO);
  }
}