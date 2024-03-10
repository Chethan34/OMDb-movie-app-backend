import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class Rating {
  @ApiProperty()
  Source: string;

  @ApiProperty()
  Value: string;
}

export class ApiMovieDto {
  @ApiProperty()
  Title: string;

  @ApiProperty()
  Year: string;

  @ApiProperty()
  Rated: string;

  @ApiProperty()
  Released: string;

  @ApiProperty()
  Runtime: string;

  @ApiProperty()
  Genre: string;

  @ApiProperty()
  Director: string;

  @ApiProperty()
  Writer: string;

  @ApiProperty()
  Actors: string;

  @ApiProperty()
  Plot: string;

  @ApiProperty()
  Language: string;

  @ApiProperty()
  Country: string;

  @ApiProperty()
  Awards: string;

  @ApiProperty()
  Poster: string;

  @ApiProperty({ type: Rating, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => Rating)
  Ratings: Rating[];

  @ApiProperty()
  Metascore: string;

  @ApiProperty()
  imdb_id: string;

  @ApiProperty()
  imdbRating: string;

  @ApiProperty()
  imdbVotes: string;

  @ApiProperty()
  Type: string;

  @ApiProperty()
  DVD: string;

  @ApiProperty()
  BoxOffice: string;

  @ApiProperty()
  Production: string;

  @ApiProperty()
  Website: string;

  @ApiProperty()
  Response: string;
}
