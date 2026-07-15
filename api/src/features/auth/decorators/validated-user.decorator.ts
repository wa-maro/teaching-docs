import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../../generated/prisma/client';
import { AuthRefresh } from '../interfaces/auth-user.interface';

export const ValidatedUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);

export const ValidatedRefresh = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthRefresh => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
