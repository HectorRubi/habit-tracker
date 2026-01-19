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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `This action returns habit with id: ${id}`;
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
}
