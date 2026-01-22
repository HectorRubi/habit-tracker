import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HabitsController } from './controllers/habits.controller';

import { HabitEntity } from './entities/habit.entity';
import { HabitLogEntity } from './entities/habit-log.entity';
import { HabitsService } from './services/habits.service';
import { HabitsLogService } from './services/habits_log.service';

@Module({
  imports: [TypeOrmModule.forFeature([HabitEntity, HabitLogEntity])],
  controllers: [HabitsController],
  providers: [HabitsService, HabitsLogService],
})
export class HabitsModule {}
