import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRespository: Repository<User>,
  ) {}
  // private readonly users: User[] = [
  //   {
  //     id: 0,
  //     username: 'marius',
  //     password: 'sosecure',
  //     email: 'marius@test.com',
  //   },
  //   {
  //     id: 1,
  //     username: 'mambo',
  //     password: 'dumbo',
  //     email: 'mambo@test.com'
  //   },
  // ];

  // findAll(username?: string): User[] {
  //   if (username) {
  //     return this.users.filter((user) => user.username === username);
  //   }
  //   return this.users;
  // }

  // findById(userId: number) {
  //   return this.users.find((user) => user.id === userId);
  // }

  // findOne(username: string): User | undefined {
  //   return this.users.find((user) => user.username === username);
  // }

  getAll(): Promise<UserDto[]> {
    return this.usersRespository.find({
      select: ['id', 'username', 'email'],
    });
  }

  async getById(id: number): Promise<UserDto> {
    try {
      const user = await this.usersRespository.findOneOrFail({
        where: { id: id },
        select: ['id', 'username', 'email'],
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getByUsernameAndPassword(username, password): Promise<UserDto> {
    try {
      const user = await this.usersRespository.findOneOrFail({
        where: { username, password },
        select: ['id', 'username', 'email'],
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = this.usersRespository.create(createUserDto);

    return this.usersRespository.save(newUser);
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.usersRespository.findOneOrFail({
      where: { id: updateUserDto.id },
    });

    if (updateUserDto.username) {
      user.username = updateUserDto.username;
    }

    if (updateUserDto.new_password) {
      user.password = updateUserDto.new_password;
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = await this.usersRespository.save(user);

    return rest;
  }

  async deleteUser(id: number): Promise<UserDto> {
    const user = await this.usersRespository.findOneOrFail({
      where: { id: id },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = await this.usersRespository.remove(user);

    return rest;
  }
}
