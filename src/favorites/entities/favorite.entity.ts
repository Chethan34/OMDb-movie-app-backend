/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { Movie } from 'src/movie/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('favorite')
export class Favorite {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  // @ApiProperty()
  // @Column()
  // user_id: number;

  // @ApiProperty()
  // @Column()
  // imdb_id: string;

  @ApiProperty()
  @ManyToOne(() => User, (userInfo) => userInfo.favorites, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty()
  @ManyToOne(() => Movie, (movieInfo) => movieInfo.favorites)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;
}
