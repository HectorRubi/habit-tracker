import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../entities/user.entity';
import { ProfileEntity } from '../entities/profile.entity';

import { CreateUserDto } from '../dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/config/environment-variables';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profilesRepository: Repository<ProfileEntity>,
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const { firstName, lastName, email, password } = createUserDto;

      const profile = await this.profilesRepository.save({
        firstName,
        lastName,
      });

      const saltRounds = this.configService.get('saltRounds', { infer: true });
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = await this.usersRepository.save({
        email,
        password: passwordHash,
        salt,
        profile: { id: profile.id },
      });

      return user;
    } catch (error) {
      // TODO: Save errors in a monitoring storage
      console.error(error);
      throw new BadRequestException();
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.usersRepository.findOneBy({ email });
    } catch (error) {
      // TODO: Save errors in a monitoring storage
      console.error(error);
      throw new BadRequestException();
    }
  }
}
