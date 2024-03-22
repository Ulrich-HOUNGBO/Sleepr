import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/creare-user.dto';
import { UsersService } from './users.service';
import { UserDocument } from './model/users.schema';
import { CurrentUser } from '../current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(@CurrentUser() user: UserDocument) {
    return user;
  }
}
