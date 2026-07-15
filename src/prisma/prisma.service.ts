import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly config: ConfigService) {
    const adapter = new PrismaBetterSqlite3({
      url: config.get('DATABASE_URL'),
    });

    super({ adapter });
  }

  onModuleInit() {
    this.$connect();
  }
}
