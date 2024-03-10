import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { DatabaseModule } from './database.module';
import { config } from './config/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import sqliteConfig from './config/ormconfig';
import { User } from './users/entities/user.entity';
import { MovieModule } from './movie/movie.module';
import { Movie } from './movie/entities/movie.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot(sqliteConfig),
    TypeOrmModule.forFeature([User, Movie]),
    // DatabaseModule,
    UsersModule,
    AuthModule,
    MovieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
