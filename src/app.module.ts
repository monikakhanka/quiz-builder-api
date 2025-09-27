import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { QuizzesModule } from './quizzes/quizzes.module';
import { DatabaseProvider } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseProvider,
    QuizzesModule,
  ],
})
export class AppModule {}
