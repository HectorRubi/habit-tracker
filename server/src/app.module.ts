import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { AppController } from './app.controller';

import configurations from './config/configurations';
import { EnvironmentVariables } from './config/environment-variables';

import { HabitEntity } from './habits/entities/habit.entity';
import { HabitLogEntity } from './habits/entities/habit-log.entity';
import { CategoryEntity } from './categories/entities/category.entity';
import { UserEntity } from './users/entities/user.entity';
import { ProfileEntity } from './users/entities/profile.entity';
import { AuthEntity } from './auth/entities/auth.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configurations] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: 'postgres',
        host: configService.get('database.host', { infer: true }),
        port: configService.get('database.port', { infer: true }),
        username: configService.get('database.user', { infer: true }),
        password: configService.get('database.password', { infer: true }),
        database: configService.get('database.name', { infer: true }),
        entities: [
          HabitEntity,
          HabitLogEntity,
          CategoryEntity,
          UserEntity,
          ProfileEntity,
          AuthEntity,
        ],
      }),
      inject: [ConfigService],
    }),
    HabitsModule,
    CategoriesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
