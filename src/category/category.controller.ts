import { Body, Controller, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CategoryService } from "./category.service";
import xlsx from 'node-xlsx';
import { Prisma } from "@prisma/client";
import { QuestionService } from "../question/question.service";

@Controller('category')
export class CategoryController {

	constructor(private categoryService: CategoryService, private questionsService: QuestionService) {
	}

	@Post('file-creation')
	@UseInterceptors(FileInterceptor('file'))
	async createCategoryWithQuestionsFromFile(@UploadedFile() file: Express.Multer.File, @Body() body: {
		categoryName: string
	}): Promise<any> {
		// Check file extension
		const fileExt = file.originalname.split('.').pop();
		if (!(fileExt === 'xls' || fileExt === 'xlsx')) {
			throw new HttpException('Invalid file extension', HttpStatus.UNPROCESSABLE_ENTITY);
		}
		// Check is category exist or create one
		const categories = await this.categoryService.findMany({
			where: {
				title: body.categoryName,
			}
		});

		if (categories.length) {
			throw new HttpException('Category with this name exist', HttpStatus.UNPROCESSABLE_ENTITY);
		}

		const createdCategory = await this.categoryService.create({
			title: body.categoryName,
		});
		console.log(`Category created: ${ createdCategory.id }  ${createdCategory.title}`);

		// Parse file
		const worksheetsFromBuffer = xlsx.parse(file.buffer);
		const questionsArr = worksheetsFromBuffer[0].data.slice(1);
		const questions: Prisma.QuestionCreateManyInput[] = questionsArr.map((el) => ({
			questionCategoryId: createdCategory.id,
			answerDesc: el[7] || '',
			correct: this.correctToNum(el[6]),
			description: el[1],
			answers: [el[2], el[3], el[4], el[5]],
		}));

		console.log(`${ questions.length } questions in file`);

		// Save questions
		return this.questionsService.createManyQuestions({
			data: questions,
			skipDuplicates: true,
		});
	}

	correctToNum(val: 'A' | 'B' | 'C' | 'D'): number {
		switch (val.replace(/\s/gm, '')) {
			// Cyryllic A
			case "A":
			case "А":
				return 0;
			// Cyrilic B
			case "B":
			case "В":
				return 1;
			// Cyrilic C
			case "C":
			case "С":
				return 2;
			case "D":
				return 3;
		}
	}

}
