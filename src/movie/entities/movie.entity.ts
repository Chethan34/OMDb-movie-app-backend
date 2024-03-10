/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movie')
export class Movie {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  imdb_id: string; // from api

  @ApiProperty()
  @OneToMany(() => Favorite, (favoriteInfo) => favoriteInfo.movie)
  favorites: Favorite[];
}
