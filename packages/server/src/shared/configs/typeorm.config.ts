import { ConfigService } from '@nestjs/config';

const getTypeOrmConfig = () => {
  return {
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>
      configService.get('ormConfig'),
  };
};

export default getTypeOrmConfig;
