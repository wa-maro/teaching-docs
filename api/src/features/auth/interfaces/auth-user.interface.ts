import { UserRole } from '../../../generated/prisma/enums';

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
  isActive: boolean;
}

export interface AuthRefresh {
  sessionId: string;
  userId: string;
}
