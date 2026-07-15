import { User } from '../../../../generated/prisma/client';
import { AuthUser } from '../../interfaces/auth-user.interface';

export class AuthResponseDto {
  access_token: string;
  user: AuthUser;

  constructor(access_token: string, user: User) {
    this.access_token = access_token;
    this.user = {
      id: user.id,
      username: user.username,
      role: user.role,
      isActive: user.isActive,
    };
  }
}
