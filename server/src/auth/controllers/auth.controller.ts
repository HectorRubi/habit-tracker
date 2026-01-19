import { Body, Controller, Post } from '@nestjs/common';

import { SignUpDto } from '../dto/signup.dto';
import { SignInDto } from '../dto/signin.dto';
import { SignOutDto } from '../dto/signout.dto';

@Controller('auth')
export class AuthController {
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return `This actions create a new user with: ${JSON.stringify(signUpDto)}`;
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return `This actions create a new access token with: ${JSON.stringify(signInDto)}`;
  }

  @Post('signout')
  signOut(@Body() signOutDto: SignOutDto) {
    return `This actions remove user session with: ${JSON.stringify(signOutDto)}`;
  }
}
