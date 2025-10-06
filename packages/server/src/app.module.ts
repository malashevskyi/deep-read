import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './ai/ai.module';
import { ConfigModule } from '@nestjs/config';
import { TtsModule } from './tts/tts.module';
import { ErrorsModule } from './errors/errors.module';
import { validationSchema } from './config/validation.schema';
import getTypeOrmConfig from './shared/configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioRecordsModule } from './audio-records/audio-records.module';
import { DictionaryEntriesModule } from './dictionary-entries/dictionary-entries.module';
import ormConfig from './shared/configs/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      validate: (config) => {
        const result = validationSchema.safeParse(config);

        if (result.success === false) {
          const errorMessages = result.error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join('\n');
          throw new Error(`Environment validation failed:\n${errorMessages}`);
        }

        return result.data;
      },
    }),
    TypeOrmModule.forRootAsync(getTypeOrmConfig()),
    ErrorsModule,
    AiModule,
    TtsModule,
    AudioRecordsModule,
    DictionaryEntriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
