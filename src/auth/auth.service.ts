import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getByUsernameAndPassword(
      username,
      password,
    );

    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // const { password, ...rest } = user;
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: CreateUserDto) {
    const newUser = await this.usersService.createUser(user);
    const payload = {
      username: newUser.username,
      sub: newUser.id,
      email: newUser.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
