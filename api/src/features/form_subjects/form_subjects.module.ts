import { Module } from '@nestjs/common';
import { FormSubjectsService } from './form_subjects.service';
import { FormSubjectsController } from './form_subjects.controller';

@Module({
  providers: [FormSubjectsService],
  controllers: [FormSubjectsController],
})
export class FormSubjectsModule {}
