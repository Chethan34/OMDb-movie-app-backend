import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Movie } from 'src/movie/entities/movie.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto) {
    const user = await this.userRepository.findOne({
      where: { id: createFavoriteDto.user_id },
      select: ['id', 'email', 'username'],
    });
    const movie = await this.movieRepository.findOne({
      where: { id: createFavoriteDto.movie_id },
    });

    const newFavorite = this.favoriteRepository.create();
    newFavorite.user = user;
    newFavorite.movie = movie;

    return this.favoriteRepository.save(newFavorite);
  }

  findAll() {
    return this.favoriteRepository.find({ relations: ['user', 'movie'] });
  }

  findOne(id: number) {
    return this.favoriteRepository.findOne({
      where: { id },
      relations: ['user', 'movie'],
    });
  }

  async findMyFavoriteMovies(user_id: number) {
    const favorites = await this.favoriteRepository.find({
      where: { user: { id: user_id } },
      relations: ['movie'],
    });

    return favorites;
  }

  async remove(id: number) {
    const favorite = await this.favoriteRepository.findOneOrFail({
      where: { id },
    });
    return await this.favoriteRepository.remove(favorite);
  }
}
