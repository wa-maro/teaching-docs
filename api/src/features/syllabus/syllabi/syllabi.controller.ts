import { SyllabiService } from './syllabi.service';
import { Controller } from '@nestjs/common';

@Controller('syllabi')
export class SyllabiController {
  constructor(private readonly syllabiService: SyllabiService) {}
}
