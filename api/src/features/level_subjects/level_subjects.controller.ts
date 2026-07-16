import { Controller } from '@nestjs/common';
import { LevelSubjectsService } from './level_subjects.service';

@Controller('level-subjects')
export class LevelSubjectsController {
  constructor(private readonly levelSubjectsService: LevelSubjectsService) {}
}
