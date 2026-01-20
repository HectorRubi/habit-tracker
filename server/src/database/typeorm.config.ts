import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [
    './src/habits/**/*.entity.{ts,js}',
    './src/categories/**/*.entity.{ts,js}',
    './src/users/**/*.entity.{ts,js}',
    './src/auth/**/*.entity.{ts,js}',
  ],
  migrations: ['./src/database/migrations/*.{ts,js}'],
});
