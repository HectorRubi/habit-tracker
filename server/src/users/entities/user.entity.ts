import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../../utils/entities/base.entity';
import { ProfileEntity } from './profile.entity';
import { AuthEntity } from '../../auth/entities/auth.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { HabitEntity } from '../../habits/entities/habit.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255 })
  salt: string;

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;

  @OneToMany(() => AuthEntity, (auth) => auth.user)
  auths: AuthEntity[];

  @OneToMany(() => CategoryEntity, (category) => category.user)
  categories: CategoryEntity[];

  @OneToMany(() => HabitEntity, (habit) => habit.user)
  habits: HabitEntity[];
}
