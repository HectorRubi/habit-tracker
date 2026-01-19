import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HabitsController } from './controllers/habits.controller';

import { HabitEntity } from './entities/habit.entity';
import { HabitLogEntity } from './entities/habit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HabitEntity, HabitLogEntity])],
  controllers: [HabitsController],
})
export class HabitsModule {}
