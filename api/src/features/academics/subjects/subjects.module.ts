import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './controllers/subjects.controller';

@Module({
  providers: [SubjectsService],
  controllers: [SubjectsController],
})
export class SubjectsModule {}
