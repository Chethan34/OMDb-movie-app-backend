import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(): any {
    return this.userService.findAll();
  }

  @Get(':id')
  getUsersById(@Param('id') id: string): any {
    return this.userService.findById(Number(id));
  }
}
