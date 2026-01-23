import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../utils/entities/base.entity';
import { HabitEntity } from './habit.entity';

@Entity('habit_log')
export class HabitLogEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => HabitEntity, (habit) => habit.habitLogs)
  habit: HabitEntity;
}
