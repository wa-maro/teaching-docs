import { Module } from '@nestjs/common';
import { SyllabiModule } from './syllabi/syllabi.module';
import { MainCompetencesModule } from './main-competences/main-competences.module';

@Module({
  imports: [SyllabiModule, MainCompetencesModule],
})
export class SyllabusModule {}
