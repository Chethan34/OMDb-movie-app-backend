import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  @MinLength(8)
  password: string;

  @ApiProperty({})
  @MinLength(8)
  new_password: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
