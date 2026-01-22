import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

import { HabitEntity } from '../entities/habit.entity';

import { CreateHabitDto } from '../dto/create-habit';
import { PaginationQueriesDto } from '../../utils/dto/pagination-queries.dto';
import { ERROR } from '../../utils/constants/errors';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(HabitEntity)
    private readonly habitsRepository: Repository<HabitEntity>,
  ) {}

  async findAll(query: PaginationQueriesDto, userId: number) {
    const limit = query.limit || 10;
    const page = query.page || 1;

    try {
      const habits = await this.habitsRepository.find({
        select: {
          id: true,
          name: true,
          description: true,
          category: { id: true },
          createdAt: true,
          updateAt: true,
        },
        where: { user: { id: userId } },
        relations: {
          category: true,
        },
        take: limit,
        skip: limit * (page - 1),
      });

      return {
        page: parseInt(`${page}`, 10),
        results: habits,
      };
    } catch (error) {
      throw new ServiceUnavailableException(ERROR.SERVICE_UNAVAILABLE, {
        cause: error,
      });
    }
  }

  async findOne(id: number) {
    try {
      const habit = await this.habitsRepository.findOneOrFail({
        where: { id },
        relations: {
          category: true,
        },
      });
      return habit;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Habit not found', { cause: error });
      } else {
        throw new ServiceUnavailableException(ERROR.SERVICE_UNAVAILABLE, {
          cause: error,
        });
      }
    }
  }

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
      throw new ServiceUnavailableException(ERROR.SERVICE_UNAVAILABLE, {
        cause: error,
      });
    }
  }
}
