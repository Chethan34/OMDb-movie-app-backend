import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  getUsersById(@Param('id') id: string): User {
    return this.userService.findById(Number(id));
  }

  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.userService.createUser(body);
  }
}
