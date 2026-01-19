import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CreateHabitDto } from '../dto/create-habit';
import { UpdateHabitDto } from '../dto/update-habit';

@Controller('habits')
export class HabitsController {
  @Get()
  findAll() {
    return 'This action returns all habits';
  }

  @Post()
  create(@Body() createDto: CreateHabitDto) {
    return `This action creates a new habit with data: ${JSON.stringify(createDto)}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns habit with id: ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateHabitDto) {
    return `This action updates habit with id: ${id} and data: ${JSON.stringify(updateDto)}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes habit with id: ${id}`;
  }

  @Get(':id/history')
  findHistory(
    @Param('id') id: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return `This action returns history for habit with id: ${id}, from: ${from}, to: ${to}`;
  }
}
