import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from './create-movie.dto';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class MovieDto extends PartialType(CreateMovieDto) {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  movie_id: number;
}
