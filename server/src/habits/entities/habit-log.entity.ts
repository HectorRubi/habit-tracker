import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../entities/base.entity';
import { HabitEntity } from './habit.entity';

@Entity('habit_log')
export class HabitLogEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => HabitEntity, (habit) => habit.habitLogs)
  habit: HabitEntity;
}
