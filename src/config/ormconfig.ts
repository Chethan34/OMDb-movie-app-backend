import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const sqliteConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default sqliteConfig;
