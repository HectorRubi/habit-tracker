import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HabitEntity } from '../entities/habit.entity';

import { CreateHabitDto } from '../dto/create-habit';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(HabitEntity)
    private readonly habitsRepository: Repository<HabitEntity>,
  ) {}

  async create(createHabitDto: CreateHabitDto, userId: number) {
    try {
      const habit = await this.habitsRepository.save({
        name: createHabitDto.name,
        description: createHabitDto.description,
        category: { id: createHabitDto.categoryId },
        user: { id: userId },
      });

      return {
        id: habit.id,
        name: habit.name,
        description: habit.description,
        categoryId: habit.category.id,
        createdAt: habit.createdAt,
      };
    } catch (error) {
      // TODO: Save errors in a monitoring storage
      console.error(error);
      throw new BadRequestException();
    }
  }
}
