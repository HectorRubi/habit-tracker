import { Module } from '@nestjs/common';
import { HabitsController } from './controllers/habits.controller';

@Module({
  controllers: [HabitsController],
})
export class HabitsModule {}
