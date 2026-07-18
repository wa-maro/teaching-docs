import { Module } from '@nestjs/common';
import { MainCompetencesService } from './main-competences.service';

@Module({
  providers: [MainCompetencesService],
})
export class MainCompetencesModule {}
