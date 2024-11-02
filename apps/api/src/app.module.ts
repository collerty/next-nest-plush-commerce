import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProductModule} from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env', '.env.production'],  // Specify the path to your .env file
      isGlobal: true,       // Makes the config available globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DB_HOST'), // Use the full connection string
        autoLoadEntities: true,
        synchronize: true, // Consider changing to false in production
        // host: configService.get<string>('DB_HOST'),
        // port: configService.get<number>('DB_PORT'),
        // username: configService.get<string>('DB_USER'),
        // password: configService.get<string>('DB_PASSWORD'),
        // database: configService.get<string>('DB_NAME'),
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // ssl: {
        //   rejectUnauthorized: false, // Consider enabling in production
        // },
        // synchronize: true, // Disable in production
      }),
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
