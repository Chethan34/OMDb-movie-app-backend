import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
