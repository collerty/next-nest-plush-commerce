import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
      private usersService: UsersService,
      private jwtService: JwtService
  ) {
  }

  async signIn(username: string, pass: string): Promise<{ access_token: string, refresh_token: string }> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid username')
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const {password, ...result} = user;
    const payload = {sub: user.id, username: user.username, email: user.email};
    const accessToken = this.jwtService.sign(payload, {expiresIn: '15m'});
    const refreshToken = this.jwtService.sign(payload, {expiresIn: '7d'});
    await this.updateRefreshToken(user.id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  async signUp(username: string, email: string, pass: string): Promise<{
    access_token: string,
    refresh_token: string
  }> {
    const existingUser = await this.usersService.findOneByEmailOrUsername(email, username);
    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = await this.usersService.create({username, email, password: hashedPassword});

    const payload = {sub: user.id, username: user.username, email: user.email};
    const accessToken = this.jwtService.sign(payload, {expiresIn: '15m'});
    const refreshToken = this.jwtService.sign(payload, {expiresIn: '7d'});
    await this.updateRefreshToken(user.id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  async logout(userId: number) {
    await this.usersService.update(userId, {refreshToken: ""});
    return { message: 'Logged out successfully' }
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update(userId, {refreshToken: hashedRefreshToken});
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findOneById(payload.sub);

      if (!user || !await bcrypt.compare(refreshToken, user.refreshToken)) {
        throw new UnauthorizedException();
      }

      const newAccessToken = this.jwtService.sign(
          {sub: user.id, email: user.email, username: user.username},
          {expiresIn: '3600s'},
      );

      const newRefreshToken = this.jwtService.sign(
          {sub: user.id, email: user.email, username: user.username},
          {expiresIn: '7d'},
      );
      await this.updateRefreshToken(user.id, newRefreshToken);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

}
