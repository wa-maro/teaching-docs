import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dtos/request/register.dto';
import { UsersService } from '../users/users.service';
import { PasswordService } from '../../security/password/password.service';
import { Session, User } from '../../generated/prisma/client';
import { AuthResponseDto } from './dtos/response/auth-response.dto';
import { JwtTokenService } from '../../security/jwt-token/jwt-token.service';
import { SessionsService } from '../../security/sessions/sessions.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserResponseDto } from '../users/dto/response/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: JwtTokenService,
    private readonly sessionsService: SessionsService,
    private readonly prisma: PrismaService,
  ) {}

  async register(dto: RegisterDto) {
    const { username, fullname, email, password } = dto;

    await this.usersService.isUsernameExists(username);

    if (email) await this.usersService.isEmailExists(email);

    const passwordHash = await this.passwordService.hash(password);

    const user = await this.usersService.insertOne({
      username,
      fullname,
      email,
      passwordHash,
    });

    const payload = this.tokenService.generatePayload(user);

    const access_token = await this.tokenService.generateAccessToken(payload);

    return new AuthResponseDto(access_token, user);
  }

  async login(user: User, userAgent: string, ipAddress: string) {
    const payload = this.tokenService.generatePayload(user);

    const access_token = await this.tokenService.generateAccessToken(payload);

    const expiresIn = this.tokenService.getRefreshExpiration();

    return await this.prisma.$transaction(async (tx) => {
      const session = await this.sessionsService.insertOne(
        {
          tokenHash: '',
          expiresAt: new Date(Date.now() + expiresIn),
          userAgent,
          ipAddress,
          lastUsedAt: new Date(Date.now()),
          user: {
            connect: { id: user.id },
          },
        },
        tx,
      );

      const refresh_token = await this.tokenService.generateRefreshToken({
        sub: user.id,
        sessionId: session.id,
      });

      await this.sessionsService.updateOne(
        session.id,
        {
          tokenHash: await this.passwordService.hash(refresh_token),
          lastUsedAt: new Date(Date.now()),
        },
        tx,
      );

      return {
        ...new AuthResponseDto(access_token, user),
        refresh_token,
        expiresIn,
      };
    });
  }

  async logout(sessionId: string) {
    const session = await this.sessionsService.findById(sessionId);
    if (!session) return;

    await this.sessionsService.updateOne(session.id, {
      revokedAt: new Date(),
    });
  }

  async profile(id: string) {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException('User not found');

    return new UserResponseDto(user);
  }

  async refreshSession(sessionId: string) {
    const { user, refresh_token, expiresIn } = await this.prisma.$transaction(
      async (tx) => {
        const session = await this.sessionsService.findByIdWithUser(
          sessionId,
          tx,
        );
        if (!session) throw new UnauthorizedException();

        const refresh_token = await this.tokenService.generateRefreshToken({
          sub: session.userId,
          sessionId: session.id,
        });

        const expiresIn = this.tokenService.getRefreshExpiration();

        await this.sessionsService.updateOne(
          session.id,
          {
            tokenHash: await this.passwordService.hash(refresh_token),
            expiresAt: new Date(Date.now() + expiresIn),
            lastUsedAt: new Date(),
          },
          tx,
        );

        return { user: session.user, refresh_token, expiresIn };
      },
    );

    const payload = this.tokenService.generatePayload(user);

    const access_token = await this.tokenService.generateAccessToken({
      sub: payload.sub,
      user: payload.user,
    });

    return {
      ...new AuthResponseDto(access_token, user),
      refresh_token,
      expiresIn,
    };
  }

  async getActiveUser(id: string) {
    return this.usersService.findActiveUserById(id);
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await this.passwordService.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async validateSession(sessionId: string, token: string): Promise<Session> {
    const session = await this.sessionsService.findById(sessionId);
    if (!session) throw new UnauthorizedException('Invalid credentials1111');

    const ok = await this.passwordService.compare(token, session.tokenHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials222');

    return session;
  }
}
