import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { PrismaService } from "../core/services/prisma.service";
import { QuestionService } from "../question/question.service";

@Module({
	imports: [],
	providers: [CategoryService, QuestionService, PrismaService],
	controllers: [CategoryController],
})
export class CategoryModule {}
