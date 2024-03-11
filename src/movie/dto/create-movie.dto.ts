import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  imdb_id: string;

  @ApiProperty()
  poster: string;

  @ApiProperty()
  year: string;
}
