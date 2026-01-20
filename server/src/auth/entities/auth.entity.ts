import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../entities/base.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('auth')
export class AuthEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  token: string;

  @Column()
  expiresAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.auths)
  user: UserEntity;
}
