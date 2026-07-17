import { Module } from '@nestjs/common';
import { LevelSubjectsService } from './level_subjects.service';
import { LevelSubjectsController } from './controllers/level_subjects.controller';

@Module({
  providers: [LevelSubjectsService],
  controllers: [LevelSubjectsController],
})
export class LevelSubjectsModule {}
