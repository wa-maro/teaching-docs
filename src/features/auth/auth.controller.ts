import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/request/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthenticatedUser } from './decorators/authenticated-user.decorator';
import type { AuthRefresh, AuthUser } from './interfaces/auth-user.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  ValidatedRefresh,
  ValidatedUser,
} from './decorators/validated-user.decorator';
import { type User } from '../../generated/prisma/client';
import type { Response } from 'express';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import {
  clearRefreshCookie,
  setRefreshCookie,
} from '../../common/utils/cookie.util';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @ValidatedUser() validUser: User,
    @Headers('user-agent') userAgent: string,
    @Ip() ip: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const ipAddress = ip.replace('::ffff:', '');

    const { refresh_token, expiresIn, ...resObj } =
      await this.authService.login(validUser, userAgent, ipAddress);

    setRefreshCookie(response, refresh_token, expiresIn);

    return resObj;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  @UseGuards(RefreshTokenGuard)
  async logout(
    @ValidatedRefresh() refresh: AuthRefresh,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(refresh.sessionId);

    clearRefreshCookie(response);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  me(@AuthenticatedUser() user: AuthUser) {
    return this.authService.profile(user.id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refresh(
    @ValidatedRefresh() refresh: AuthRefresh,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refresh_token, expiresIn, ...resObj } =
      await this.authService.refreshSession(refresh.sessionId);

    setRefreshCookie(response, refresh_token, expiresIn);

    return resObj;
  }
}
