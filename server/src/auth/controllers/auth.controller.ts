import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import { Public } from '../decorators/public.decorator';

import { SignInDto } from '../dto/signin.dto';
import { SignOutDto } from '../dto/signout.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('signout')
  signOut(@Body() signOutDto: SignOutDto) {
    return `This actions remove user session with: ${JSON.stringify(signOutDto)}`;
  }
}
