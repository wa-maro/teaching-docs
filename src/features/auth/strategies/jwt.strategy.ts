import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from '../interfaces/jwt-payload.interface';
import { type AuthUser } from '../interfaces/auth-user.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: JWTPayload): Promise<AuthUser> {
    const existing = await this.authService.getActiveUser(payload.sub);
    if (!existing) throw new UnauthorizedException();

    return {
      id: existing.id,
      username: existing.username,
      role: existing.role,
      isActive: existing.isActive,
    };
  }
}
