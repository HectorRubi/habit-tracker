import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../entities/base.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 510 })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.categories)
  user: UserEntity;
}
