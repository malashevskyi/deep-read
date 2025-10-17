import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const config: DataSourceOptions = {
  type: 'postgres',
  url: process.env['DATABASE_URL'],
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
  ssl:
    process.env['NODE_ENV'] === 'production'
      ? { rejectUnauthorized: false }
      : false,
  synchronize: false,
  migrationsRun: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export default registerAs('ormConfig', () => config);

export const connectionSource = new DataSource(config);
