import { Module } from '@nestjs/common';
import { FormSubjectsModule } from './form_subjects/form_subjects.module';
import { SubjectsModule } from './subjects/subjects.module';
import { FormsModule } from './forms/forms.module';
import { LevelsModule } from './levels/levels.module';
import { LevelSubjectsModule } from './level_subjects/level_subjects.module';

@Module({
  imports: [
    LevelsModule,
    FormsModule,
    SubjectsModule,
    LevelSubjectsModule,
    FormSubjectsModule,
  ],
})
export class AcademicsModule {}
