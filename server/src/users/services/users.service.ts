import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { ProfileEntity } from '../entities/profile.entity';

import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profilesRepository: Repository<ProfileEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const { firstName, lastName, email, password } = createUserDto;

      const profile = await this.profilesRepository.save({
        firstName,
        lastName,
      });

      const user = await this.usersRepository.save({
        email,
        password,
        salt: '',
        profile: { id: profile.id },
      });

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
