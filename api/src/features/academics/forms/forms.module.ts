import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './controllers/forms.controller';

@Module({
  providers: [FormsService],
  controllers: [FormsController],
})
export class FormsModule {}
