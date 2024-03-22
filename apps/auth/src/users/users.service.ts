import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/creare-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOneById({ email });
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.userRepository.findOneById(getUserDto);
  }
}
