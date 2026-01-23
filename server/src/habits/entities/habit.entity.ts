import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../../utils/entities/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { HabitLogEntity } from './habit-log.entity';

@Entity('habit')
export class HabitEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 510 })
  description: string;

  @OneToMany(() => HabitLogEntity, (habitLog) => habitLog.habit)
  habitLogs: HabitLogEntity[];

  @ManyToOne(() => CategoryEntity, (category) => category.habits)
  category: CategoryEntity;

  @ManyToOne(() => UserEntity, (user) => user.habits)
  user: UserEntity;
}
