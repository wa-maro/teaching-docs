import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SecurityModule } from './security/security.module';
import { AuthModule } from './features/auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { AcademicsModule } from './features/academics/academics.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().port().default(3000),
        DATABASE_URL: Joi.string()
          .pattern(/^postgres(ql)?:\/\//)
          .required()
          .messages({
            'string.pattern.base':
              'DATABASE_URL must be a valid PostgreSQL connection string',
          }),
        JWT_ACCESS_SECRET: Joi.string()
          .min(10)
          .required()
          .label('JWT_ACCESS_SECRET'),
        JWT_ACCESS_EXPIRES_IN: Joi.string().default('60s'),
        JWT_REFRESH_SECRET: Joi.string()
          .min(10)
          .required()
          .label('JWT_REFRESH_SECRET'),
        JWT_REFRESH_EXPIRES_IN: Joi.string().default('1h'),
      }),
      validationOptions: {
        abortEarly: process.env.NODE_ENV === 'production',
      },
    }),
    PrismaModule,
    SecurityModule,
    AuthModule,
    UsersModule,
    AcademicsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
