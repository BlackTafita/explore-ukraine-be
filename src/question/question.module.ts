import { Module } from "@nestjs/common";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";
import { PrismaService } from "../core/services/prisma.service";


@Module({
  providers: [PrismaService, QuestionService],
  exports: [],
  controllers: [QuestionController],
})
export class QuestionModule {}
