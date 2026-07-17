import { Controller } from '@nestjs/common';
import { FormSubjectsService } from '../form_subjects.service';

@Controller('form-subjects')
export class FormSubjectsController {
  constructor(private readonly formSubjectsService: FormSubjectsService) {}
}
