import { UserRole } from '../../../generated/prisma/enums';

export interface JWTPayload {
  sub: string;
  user: {
    username: string;
    role: UserRole;
  };
}

export interface JwtRefreshPayload {
  sub: string;
  sessionId: string;
}
