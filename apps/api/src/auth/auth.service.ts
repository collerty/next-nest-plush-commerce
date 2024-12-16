import {Injectable, Res, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {User} from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
      private usersService: UsersService,
      private jwtService: JwtService
  ) {
  }

  async signIn(email: string, pass: string, res: any): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid username')
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const {password, ...result} = user;
    const payload = {sub: user.id, username: user.username, email: user.email};
    const accessToken = this.jwtService.sign(payload, {expiresIn: '60m'});
    const refreshToken = this.jwtService.sign(payload, {expiresIn: '7d'});
    await this.updateRefreshToken(user.id, refreshToken);

    // Set cookies in the response
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

    return {
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }

  async signUp(username: string, email: string, pass: string): Promise<{
    accessToken: string,
    refreshToken: string
  }> {
    const existingUser = await this.usersService.findOneByEmailOrUsername(email, username);
    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = await this.usersService.create({username, email, password: hashedPassword});

    const payload = {sub: user.id, username: user.username, email: user.email};
    const accessToken = this.jwtService.sign(payload, {expiresIn: '60m'});
    const refreshToken = this.jwtService.sign(payload, {expiresIn: '7d'});
    await this.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }

  async socialLogin(user: any, provider: string): Promise<{ accessToken: string, refreshToken: string }> {
    const payload = {sub: user.id, username: user.username, email: user.email};
    const accessToken = this.jwtService.sign(payload, {expiresIn: '60m'});
    const refreshToken = this.jwtService.sign(payload, {expiresIn: '7d'});

    await this.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async logout(userId: number) {
    await this.usersService.update(userId, {refreshToken: ""});
    return {message: 'Logged out successfully'}
  }

  async refreshTokens(refreshToken: string) {
    try {
      // Step 1: Verify the JWT refresh token
      const payload = this.jwtService.verify(refreshToken); // Verifies the integrity of the JWT

      // Step 2: Retrieve the user from the database
      const user = await this.usersService.findOneById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Step 3: Compare the incoming refresh token with the hashed refresh token stored in the DB
      const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
      console.log(isValid, refreshToken, user.refreshToken);
      if (!isValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Step 4: Generate new access and refresh tokens (JWT for access, random string for refresh)
      const newAccessToken = this.jwtService.sign(
          { sub: user.id, email: user.email, username: user.username },
          { expiresIn: '3600s' }
      );

      const newRefreshToken = crypto.randomBytes(64).toString('hex'); // Generate a random string as a new refresh token

      // Step 5: Hash the new refresh token before storing it in the database
      await this.updateRefreshToken(user.id, newRefreshToken);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // Update the refresh token by hashing it before saving to the DB
  async updateRefreshToken(userId: number, refreshToken: string) {
    // const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update(userId, { refreshToken: refreshToken });
  }

  async validateOAuthUser(profile: any, provider: string): Promise<User> {
    return this.usersService.findOrCreateUser(profile, provider);
  }

  async generateJwtToken(user: User): Promise<string> {
    return this.jwtService.sign(
        {sub: user.id, email: user.email, username: user.username},
        {expiresIn: '3600s'},
    );
  }

}
