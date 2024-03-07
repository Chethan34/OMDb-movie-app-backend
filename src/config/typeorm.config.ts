import { DataSourceOptions } from 'typeorm';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'tacocat',
  database: 'product',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
