import { Module } from '@nestjs/common';
import { SyllabiModule } from './syllabi/syllabi.module';

@Module({
  imports: [SyllabiModule],
})
export class SyllabusModule {}
