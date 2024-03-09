/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  // @ApiQuery({ name: 'username', required: false })
  @Get()
  getUsers(): Promise<UserDto[]> {
    return this.userService.getAll();
  }

  @ApiOkResponse({ type: UserDto, isArray: false, description: 'single user' })
  @ApiNotFoundResponse()
  @Get(':id')
  getUsersById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    const user = this.userService.getById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  // @ApiCreatedResponse({ type: User })
  // @ApiBadRequestResponse()
  // @Post()
  // createUser(@Body() body: CreateUserDto): Promise<User> {
  //   return this.userService.createUser(body);
  // }

  // @ApiCreatedResponse({ type: User })
  // @ApiBadRequestResponse()
  // @Patch('update')
  // updateUser(@Body() body: UpdateUserDto): Promise<UserDto> {
  //   return this.userService.updateUser(body);
  // }

  // @ApiCreatedResponse({ type: User })
  // @Delete('delete')
  // deleteUser(@Body() body: { id: number }): Promise<UserDto> {
  //   return this.userService.deleteUser(Number(body.id));
  // }
}
