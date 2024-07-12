import { createConnection, ConnectionOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import sqliteConfig from './config/ormconfig';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const isDevelopment = process.env.NODE_ENV !== 'production';
      const config: ConnectionOptions = isDevelopment ? sqliteConfig : {
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      };
      return await createConnection(config);
    },
    inject: [ConfigService],
  },
];

