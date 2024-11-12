import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req, Res} from '@nestjs/common';
import {AuthService} from './auth.service';
import {SignInDto} from './dto/sign-in.dto';
import {AuthGuard} from '@nestjs/passport';
import {SignUpDto} from "./dto/sign-up.dto";
import {Public} from "./public.decorator";
import {GithubAuthGuard} from "./guards/github-auth.guard";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {GoogleAuthGuard} from "./guards/google-auth.guard";
import {JwtRefreshAuthGuard} from "./guards/jwt-refresh-auth.guard";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Public()
  @Post('login')
  // @UseGuards(LocalAuthGuard)
  login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @Post('register')
  register(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.username, signUpDto.email, signUpDto.password);
  }

  @Post('logout')
  // @UseGuards(JwtAuthGuard)
  logOut(@Req() req: any) {
    return this.authService.logout(req.user.id);
  }

  @Get('profile')
  // @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Post('refresh')
  // @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    const newTokens = await this.authService.refreshTokens(refreshToken);
    return newTokens;
  }


  @Get('google')
  // @UseGuards(GoogleAuthGuard)
  async googleAuth() {
  }

  @Get('google/callback')
  // @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {
    const jwtToken = await this.authService.generateJwtToken(req.user);
    res.json({token: jwtToken});
  }

  @Get('github')
  // @UseGuards(GithubAuthGuard)
  async githubAuth() {
  }

  @Get('github/callback')
  // @UseGuards(GithubAuthGuard)
  async githubAuthRedirect(@Req() req: any, @Res() res: any) {
    const jwtToken = await this.authService.generateJwtToken(req.user);
    res.json({token: jwtToken});
  }

}
