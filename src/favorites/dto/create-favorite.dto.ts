import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  movie_id: number;
}
