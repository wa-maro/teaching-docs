import { Module } from '@nestjs/common';
import { PasswordService } from './password/password.service';
import { JwtTokenService } from './jwt-token/jwt-token.service';
import { SessionsService } from './sessions/sessions.service';

@Module({
  providers: [PasswordService, JwtTokenService, SessionsService],
  exports: [PasswordService, JwtTokenService, SessionsService],
})
export class SecurityModule {}
