import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabitLogEntity } from '../entities/habit-log.entity';
import { CheckHabitDto } from '../dto/check-habit';
import { ERROR } from '../../utils/constants/errors';

@Injectable()
export class HabitsLogService {
  constructor(
    @InjectRepository(HabitLogEntity)
    private readonly habitLogRepository: Repository<HabitLogEntity>,
  ) {}

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
