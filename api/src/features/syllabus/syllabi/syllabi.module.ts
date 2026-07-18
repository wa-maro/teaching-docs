import { Module } from '@nestjs/common';
import { SyllabiService } from './syllabi.service';
import { SyllabiController } from './syllabi.controller';

@Module({
  providers: [SyllabiService],
  controllers: [SyllabiController],
})
export class SyllabiModule {}
