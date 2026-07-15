import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, User } from '../../generated/prisma/client';
import { UserResponseDto } from './dto/response/user-response.dto';
import { CreateUserDto } from './dto/request/create-user.dto';
import { PasswordService } from '../../security/password/password.service';
import { UpdateUserDto } from './dto/request/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const { username, fullname, email, role, password, isActive } = dto;

    await this.isUsernameExists(username);

    if (email) await this.isEmailExists(email);

    const passwordHash = await this.passwordService.hash(password);

    const user = await this.insertOne({
      username,
      fullname,
      role,
      email,
      isActive,
      passwordHash,
    });

    return new UserResponseDto(user);
  }

  async list(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserResponseDto(user));
  }

  async retrieve(id: string): Promise<UserResponseDto> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');

    return new UserResponseDto(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    const { username, fullname, email, role, isActive } = dto;

    if (username) await this.isUsernameExists(username, id);

    if (email) await this.isEmailExists(email, id);

    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');

    const updated = await this.updateOne(user.id, {
      username,
      fullname,
      email,
      role,
      isActive,
    });

    return new UserResponseDto(updated);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');

    await this.prisma.user.delete({ where: { id: user.id } });
  }

  async insertOne(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async updateOne(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findActiveUserById(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { id, isActive: true } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async isEmailExists(email: string, excludeId?: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user && user.id !== excludeId)
      throw new ConflictException('Email already taken');
  }

  async isUsernameExists(username: string, excludeId?: string): Promise<void> {
    const user = await this.findByUsername(username);

    if (user && user.id !== excludeId)
      throw new ConflictException('Username already taken');
  }
}
