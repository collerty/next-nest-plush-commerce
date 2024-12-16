import {Controller, Post, Body, Get, Req, Res, UseGuards} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {SignInDto} from './dto/sign-in.dto';
import {SignUpDto} from './dto/sign-up.dto';
import {Public} from './public.decorator';
import {GoogleOauthGuard} from './guards/google-oauth.guard';
import {GithubOauthGuard} from './guards/github-oauth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Public()
  @Post('login')
  @ApiOperation({summary: 'Log in with email and password'})
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in and returned access and refresh tokens.',
  })
  @ApiResponse({status: 401, description: 'Invalid credentials.'})
  login(@Body() signInDto: SignInDto, @Res({passthrough: true}) res: any) {
    return this.authService.signIn(signInDto.email, signInDto.password, res);
  }

  @Public()
  @Post('register')
  @ApiOperation({summary: 'Register a new user'})
  @ApiResponse({
    status: 201,
    description: 'Successfully registered and returned access and refresh tokens.',
  })
  @ApiResponse({status: 400, description: 'User with this email or username already exists.'})
  register(@Body() signUpDto: SignUpDto, @Res({passthrough: true}) res: any) {
    return this.authService.signUp(signUpDto.username, signUpDto.email, signUpDto.password, res);
  }

  @Post('logout')
  @ApiOperation({summary: 'Log out the current user'})
  @ApiResponse({status: 200, description: 'Successfully logged out.'})
  logOut(@Req() req: any) {
    return this.authService.logout(req.user.id);
  }

  @Get('profile')
  @ApiOperation({summary: 'Get the profile of the current logged-in user'})
  @ApiResponse({
    status: 200,
    description: 'Return the user profile.',
  })
  @ApiResponse({status: 401, description: 'Unauthorized.'})
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Public()
  @Post('refresh')
  @ApiOperation({summary: 'Refresh the access and refresh tokens'})
  @ApiResponse({
    status: 200,
    description: 'Successfully refreshed tokens.',
  })
  @ApiResponse({status: 401, description: 'Invalid or expired refresh token.'})
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    const newTokens = await this.authService.refreshTokens(refreshToken);
    return newTokens;
  }

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google')
  @ApiOperation({summary: 'Google OAuth authentication'})
  googleAuth() {
  }

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google/callback')
  @ApiOperation({summary: 'Google OAuth callback'})
  @ApiResponse({status: 200, description: 'OAuth login successful.'})
  @ApiResponse({status: 400, description: 'OAuth authentication failed.'})
  async googleAuthRedirect(@Req() req: any, @Res({passthrough: true}) res: any) {
    const tokens = await this.authService.socialLogin(req.user, 'google');
    const {accessToken, refreshToken} = tokens;
    // res.json(tokens);
    // const redirectUrl = `http://localhost:3000/auth/callback?token=${accessToken}`;
    const redirectUrl = 'http://localhost:3000/';
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.redirect(redirectUrl);
  }

  @Public()
  @UseGuards(GithubOauthGuard)
  @Get('github')
  @ApiOperation({summary: 'GitHub OAuth authentication'})
  githubAuth() {
  }

  @Public()
  @UseGuards(GithubOauthGuard)
  @Get('github/callback')
  @ApiOperation({summary: 'GitHub OAuth callback'})
  @ApiResponse({status: 200, description: 'OAuth login successful.'})
  @ApiResponse({status: 400, description: 'OAuth authentication failed.'})
  async githubAuthRedirect(@Req() req: any, @Res() res: any) {
    const tokens = await this.authService.socialLogin(req.user, 'github');
    const {accessToken, refreshToken} = tokens;
    // res.json(tokens);
    // const redirectUrl = `http://localhost:3000/auth/callback?token=${accessToken}`;
    const redirectUrl = 'http://localhost:3000/';
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.redirect(redirectUrl);
  }
}
