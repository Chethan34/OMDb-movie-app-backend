import { createConnection, ConnectionOptions } from 'typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const config = await typeOrmConfig(configService); // Pass the configService
      const connection = await createConnection(config as ConnectionOptions);
      return connection;
    },
    inject: [ConfigService], // Inject ConfigService
  },
];
