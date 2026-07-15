import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../../users/dto/request/create-user.dto';

export class RegisterDto extends PickType(CreateUserDto, [
  'username',
  'password',
  'fullname',
  'email',
]) {}
