import { createParamDecorator } from '@nestjs/common';
import { UserEntity } from '../../users/entities/user.entity';

export const User = createParamDecorator((data, context) => {
  const request = context.switchToHttp().getRequest<{ user: UserEntity }>();
  return request.user;
});
