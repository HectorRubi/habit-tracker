import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './controllers/auth.controller';
import { AuthEntity } from './entities/auth.entity';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity]), UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
