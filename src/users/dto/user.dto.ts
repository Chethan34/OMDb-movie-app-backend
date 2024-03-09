import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
