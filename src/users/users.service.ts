import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 0,
      name: 'Marius',
      username: 'marius',
      password: 'sosecure',
    },
    {
      id: 1,
      name: 'Mambo',
      username: 'mambo',
      password: 'dumbo',
    },
  ];

  async findAll() {
    return await this.users;
  }

  async findById(userId: number) {
    return await this.users.find((user) => user.id === userId);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
