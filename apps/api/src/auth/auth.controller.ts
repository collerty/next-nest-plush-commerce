import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import {AuthGuard} from "./auth.guard";
// import {RequestWithUser} from "./interfaces/request-with-user";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req:any) {
    return req.user;
  }

}
