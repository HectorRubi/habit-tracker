import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { HabitLogEntity } from '../entities/habit-log.entity';
import { CheckHabitDto } from '../dto/check-habit';
import { ERROR } from '../../utils/constants/errors';
import { FindHistoryDto } from '../dto/find-history.dto';

@Injectable()
export class HabitsLogService {
  constructor(
    @InjectRepository(HabitLogEntity)
    private readonly habitLogRepository: Repository<HabitLogEntity>,
  ) {}

  async findHistory(findHistoryDto: FindHistoryDto, habitId: number) {
    const from = findHistoryDto.from;
    const to = findHistoryDto.to;

    if (from > to) {
      throw new BadRequestException(
        '"from" date must be earlier than "to" date',
      );
    }

    try {
      const habitLog = await this.habitLogRepository.find({
        select: { id: true, date: true },
        where: {
          isDeleted: false,
          habit: { id: habitId },
          date: Between(from, to),
        },
      });

      return habitLog;
    } catch (error) {
      throw new ServiceUnavailableException(ERROR.SERVICE_UNAVAILABLE, {
        cause: error,
      });
    }
  }

  async check(checkDto: CheckHabitDto, habitId: number) {
    try {
      let habitLog = await this.habitLogRepository.findOne({
        where: { date: checkDto.date, habit: { id: habitId } },
      });

      let message = 'Habit checked';

      if (habitLog) {
        await this.habitLogRepository.update(habitLog.id, {
          isDeleted: !habitLog.isDeleted,
        });

        if (!habitLog.isDeleted === true) {
          message = 'Habit unchecked';
        }
      } else {
        habitLog = await this.habitLogRepository.save({
          date: checkDto.date,
          habit: { id: habitId },
        });
      }

      return { message };
    } catch (error) {
      throw new ServiceUnavailableException(ERROR.SERVICE_UNAVAILABLE, {
        cause: error,
      });
    }
  }
}
