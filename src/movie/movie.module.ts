import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { ApiModule } from 'src/api/api.module';
import { Favorite } from 'src/favorites/entities/favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Favorite]), ApiModule],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
