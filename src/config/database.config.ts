import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const DatabaseProvider = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    url: config.get<string>('DATABASE_URL'),
    ssl:
      config.get('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
    autoLoadEntities: true,
    synchronize: true,
  }),
});
