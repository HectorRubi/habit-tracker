import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../../utils/entities/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { HabitEntity } from '../../habits/entities/habit.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 510 })
  description: string;

  @OneToMany(() => HabitEntity, (habit) => habit.category)
  habits: HabitEntity[];

  @ManyToOne(() => UserEntity, (user) => user.categories)
  user: UserEntity;
}
