import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsAlphanumeric()
  username: string;

  @ApiProperty()
  @MinLength(8)
  password: string;
}
