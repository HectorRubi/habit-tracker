import { Body, Controller, Post } from '@nestjs/common';

import { Public } from '../../auth/decorators/public.decorator';

import { UsersService } from '../services/users.service';

import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
