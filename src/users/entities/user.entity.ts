import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

  // @BeforeInsert() async hashPassword() {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }
}
