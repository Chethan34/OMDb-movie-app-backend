import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
// import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieDto } from './dto/movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ApiService } from 'src/api/api.service';
import { ApiMovieDto } from 'src/api/dto/apimovie.dto';

@Injectable()
export class MovieService {
  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async createOrFind(createMovieDto: CreateMovieDto): Promise<MovieDto> {
    // Assuming `imdbID` is a unique identifier for movies
    const existingMovie = await this.movieRepository.findOne({
      where: { imdb_id: createMovieDto.imdb_id },
    });

    if (existingMovie) {
      // If the movie exists, return it
      return existingMovie;
    } else {
      // If the movie does not exist, create and save it
      const newMovie = this.movieRepository.create(createMovieDto);
      return this.movieRepository.save(newMovie);
    }
  }

  findAll(): Promise<MovieDto[]> {
    return this.movieRepository.find();
  }

  findOne(id: number): Promise<MovieDto> {
    return this.movieRepository.findOneOrFail({ where: { id } });
  }

  findOneByImdb(imdb_id: string): Promise<MovieDto> {
    return this.movieRepository.findOneOrFail({ where: { imdb_id } });
  }

  // async update(id: number, updateMovieDto: UpdateMovieDto): Promise<MovieDto> {
  //   const movie = await this.movieRepository.findOneOrFail({ where: { id } });

  //   if (updateMovieDto.imdb_id) {
  //     movie.imdb_id = updateMovieDto.imdb_id;
  //   }
  //   if (updateMovieDto.title) {
  //     movie.title = updateMovieDto.title;
  //   }

  //   return this.movieRepository.save(movie);
  // }

  // async remove(id: number): Promise<MovieDto> {
  //   const movie = await this.movieRepository.findOneOrFail({ where: { id } });
  //   return this.movieRepository.remove(movie);
  // }

  // Below is for request to apiService
  apiTest(): string {
    return this.apiService.getHello();
  }

  getMoviesByTitle(title: string, page: number = 1): Promise<ApiMovieDto> {
    return this.apiService.getMoviesByTitle(title, page);
  }

  getMovieByTitle(title: string): Promise<ApiMovieDto> {
    return this.apiService.getMovieByTitle(title);
  }

  getMovieByImdb(imdb_id: string): Promise<ApiMovieDto> {
    return this.apiService.getMovieByImdb(imdb_id);
  }
}
