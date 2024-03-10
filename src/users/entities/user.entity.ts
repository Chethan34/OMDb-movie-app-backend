/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import * as bcrypt from 'bcrypt';

@Entity('user')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  username: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  // @BeforeInsert() async hashPassword() {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }
}
