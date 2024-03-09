import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export const typeOrmConfig = async (
  configService: ConfigService,
): Promise<DataSourceOptions> => {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  };
  // docker
  // return {
  //   type: 'postgres',
  //   host: 'postgres',
  //   port: 5432,
  //   username: configService.get<string>('DB_USER'),
  //   password: configService.get<string>('DB_PASSWORD'),
  //   database: configService.get<string>('DB_NAME'),
  //   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  //   synchronize: true,
  // };
};
