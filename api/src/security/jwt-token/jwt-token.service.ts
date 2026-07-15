import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  JWTPayload,
  JwtRefreshPayload,
} from '../../features/auth/interfaces/jwt-payload.interface';
import { toMilliseconds } from '../../common/utils/date.util';
import { AuthUser } from '../../features/auth/interfaces/auth-user.interface';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Generate JWT access token
   * @param payload JWTPayload
   * @returns string
   */
  async generateAccessToken(payload: JWTPayload): Promise<string> {
    return await this.jwt.signAsync(payload, {
      secret: this.config.getOrThrow('JWT_ACCESS_SECRET'),
      expiresIn: this.config.getOrThrow('JWT_ACCESS_EXPIRES_IN'),
    });
  }

  /**
   * Generate JWT refresh token
   * @param payload JwtRefreshPayload
   * @returns string
   */
  async generateRefreshToken(payload: JwtRefreshPayload): Promise<string> {
    return await this.jwt.signAsync(payload, {
      secret: this.config.getOrThrow('JWT_REFRESH_SECRET'),
      expiresIn: this.config.getOrThrow('JWT_REFRESH_EXPIRES_IN') || '1h',
    });
  }

  /**
   * Retrieve JWT refresh expiration
   * @returns number
   */
  getRefreshExpiration(): number {
    return toMilliseconds(
      this.config.getOrThrow('JWT_REFRESH_EXPIRES_IN') || '1h',
    );
  }

  /**
   * Generate JWT access token payload
   * @param user AuthUser
   * @returns JwtPayload
   */
  generatePayload(user: AuthUser): JWTPayload {
    return {
      sub: user.id,
      user: { username: user.username, role: user.role },
    };
  }
}
