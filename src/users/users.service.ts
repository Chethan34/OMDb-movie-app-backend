import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRespository: Repository<User>,
  ) {}
  private readonly users: User[] = [
    {
      id: 0,
      username: 'marius',
      password: 'sosecure',
    },
    {
      id: 1,
      username: 'mambo',
      password: 'dumbo',
    },
  ];

  findAll(username?: string): User[] {
    if (username) {
      return this.users.filter((user) => user.username === username);
    }
    return this.users;
  }

  findById(userId: number) {
    return this.users.find((user) => user.id === userId);
  }

  findOne(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  getAll(): Promise<User[]> {
    return this.usersRespository.find();
  }

  async getById(id: number): Promise<User> {
    try {
      const user = await this.usersRespository.findOneOrFail({
        where: { id: id },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getByUsernameAndPassword(username, password): Promise<User> {
    try {
      const user = await this.usersRespository.findOneOrFail({
        where: { username, password },
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

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getById(updateUserDto.id);

    if (updateUserDto.username) {
      user.username = updateUserDto.username;
    }

    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }

    return this.usersRespository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getById(id);

    return await this.usersRespository.remove(user);
  }
}
