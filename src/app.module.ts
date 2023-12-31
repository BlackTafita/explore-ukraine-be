import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './core/services/prisma.service';
import { QuestionModule } from './question/question.module';
import { CategoryModule } from "./category/category.module";

@Module({
  imports: [ConfigModule.forRoot(), QuestionModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
