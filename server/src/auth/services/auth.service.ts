import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../../users/services/users.service';

import { SignInDto } from '../dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(signInDto.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    try {
      const payload = { sub: user.id };
      const accessToken = await this.jwtService.signAsync(payload);

      // TODO: stores access token in a cache db to manage sessions

      return { accessToken };
    } catch (error) {
      // TODO: Save errors in a monitoring storage
      console.error(error);
      throw new BadRequestException('Invalid credentials');
    }
  }
}
