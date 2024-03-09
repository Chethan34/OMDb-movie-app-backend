import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
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

  findAll(): User[] {
    return this.users;
  }

  findById(userId: number) {
    return this.users.find((user) => user.id === userId);
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = {
      id: this.users.length,
      ...createUserDto,
    };
    this.users.push(newUser);

    return newUser;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
