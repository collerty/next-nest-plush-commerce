import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req} from '@nestjs/common';
import {AuthService} from './auth.service';
import {SignInDto} from './dto/sign-in.dto';
import {AuthGuard} from "./auth.guard";
import {SignUpDto} from "./dto/sign-up.dto";
import {Public} from "./public.decorator";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Public()
  @Post('login')
  login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @Post('register')
  register(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.username, signUpDto.email, signUpDto.password);
  }

  @Post('logout')
  logOut(@Req() req:any) {
    return this.authService.logout(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Post('refresh')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    const newTokens = await this.authService.refreshTokens(refreshToken);
    return newTokens;
  }

}
