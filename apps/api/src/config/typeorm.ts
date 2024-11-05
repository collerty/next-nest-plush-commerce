// src/config/typeorm.ts

import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import {User} from "../users/entities/user.entity";
import {Product} from "../products/entities/product.entity";
import {DataSource, DataSourceOptions} from "typeorm";

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  url: process.env.DB_HOST,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],
  // entities: [User, Product],
  // migrations: ['/../migrations/*{.ts,.js}'],
  synchronize: true, // Disable synchronize in production
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);