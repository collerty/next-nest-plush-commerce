import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from '../users/users.module';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {UsersService} from "../users/users.service";
import {AuthGuard} from "./auth.guard";
import {APP_GUARD} from "@nestjs/core";

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {expiresIn: '3600s'},
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,   {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AuthModule {
}
