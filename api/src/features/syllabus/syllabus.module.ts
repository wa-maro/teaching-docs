import { Module } from '@nestjs/common';
import { SyllabiModule } from './syllabi/syllabi.module';
import { MainCompetencesModule } from './main-competences/main-competences.module';
import { SpecificCompetencesModule } from './specific-competences/specific-competences.module';

@Module({
  imports: [SyllabiModule, MainCompetencesModule, SpecificCompetencesModule],
})
export class SyllabusModule {}
