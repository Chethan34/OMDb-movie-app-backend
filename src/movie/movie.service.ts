import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieDto } from './dto/movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  create(createMovieDto: CreateMovieDto): Promise<MovieDto> {
    const newMovie = this.movieRepository.create(createMovieDto);

    return this.movieRepository.save(newMovie);
  }

  findAll(): Promise<MovieDto[]> {
    return this.movieRepository.find();
  }

  findOne(id: number): Promise<MovieDto> {
    return this.movieRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<MovieDto> {
    const movie = await this.movieRepository.findOneOrFail({ where: { id } });

    if (updateMovieDto.movie_id) {
      movie.movie_id = updateMovieDto.movie_id;
    }
    if (updateMovieDto.title) {
      movie.title = updateMovieDto.title;
    }

    return this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<MovieDto> {
    const movie = await this.movieRepository.findOneOrFail({ where: { id } });
    return this.movieRepository.remove(movie);
  }
}
