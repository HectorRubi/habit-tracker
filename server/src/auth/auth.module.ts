import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { UsersModule } from '../users/users.module';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthEntity } from './entities/auth.entity';
import { AuthGuard } from './guards/auth.guard';

import { EnvironmentVariables } from '../config/environment-variables';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (
        configService: ConfigService<EnvironmentVariables, true>,
      ) => ({
        global: true,
        secret: configService.get('jwt.secret', { infer: true }),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn', { infer: true }),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}
