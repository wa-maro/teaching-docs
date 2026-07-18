import { Module } from '@nestjs/common';
import { SpecificCompetencesService } from './specific-competences.service';

@Module({
  providers: [SpecificCompetencesService],
})
export class SpecificCompetencesModule {}
