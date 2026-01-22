import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { HabitsService } from '../services/habits.service';
import { UserEntity } from '../../users/entities/user.entity';
import { User } from '../../auth/decorators/user.decorator';
import { CreateHabitDto } from '../dto/create-habit';
import { UpdateHabitDto } from '../dto/update-habit';
import { CheckHabitDto } from '../dto/check-habit';
import { PaginationQueriesDto } from '../../utils/dto/pagination-queries.dto';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  async findAll(
    @Query() query: PaginationQueriesDto,
    @User() user: UserEntity,
  ) {
    return await this.habitsService.findAll(query, user.id);
  }

  @Post()
  async create(
    @Body() createHabitDto: CreateHabitDto,
    @User() user: UserEntity,
  ) {
    return await this.habitsService.create(createHabitDto, user.id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.habitsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateHabitDto,
  ) {
    return `This action updates habit with id: ${id} and data: ${JSON.stringify(updateDto)}`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return `This action removes habit with id: ${id}`;
  }

  @Get(':id/history')
  findHistory(
    @Param('id', ParseIntPipe) id: number,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return `This action returns history for habit with id: ${id}, from: ${from}, to: ${to}`;
  }

  @Post(':id/check')
  check(
    @Param('id', ParseIntPipe) id: number,
    @Body() checkDto: CheckHabitDto,
  ) {
    return `This actions create a habit history log with id: ${id} and data: ${JSON.stringify(checkDto)}`;
  }
}
