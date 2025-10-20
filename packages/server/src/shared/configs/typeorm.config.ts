import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

const getTypeOrmConfig = () => {
  return {
    inject: [ConfigService],
    useFactory: (configService: ConfigService): DataSourceOptions => {
      const config = configService.get<DataSourceOptions>('ormConfig');
      if (!config) {
        throw new Error('ORM configuration not found');
      }
      return config;
    },
  };
};

export default getTypeOrmConfig;
