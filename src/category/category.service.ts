import { Injectable } from "@nestjs/common";
import { PrismaService } from "../core/services/prisma.service";
import { Prisma, QuestionCategory } from "@prisma/client";

@Injectable({})
export class CategoryService {

	constructor(private prisma: PrismaService) {
	}

	async create(data: Prisma.QuestionCategoryCreateInput): Promise<QuestionCategory> {
		return this.prisma.questionCategory.create({data});
	}

	async findOne(id: number): Promise<QuestionCategory> {
		return this.prisma.questionCategory.findUnique({
			where: {
				id,
			}
		});
	}

	async findMany(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.QuestionCategoryWhereUniqueInput;
		where?: Prisma.QuestionCategoryWhereInput;
		orderBy?: Prisma.QuestionCategoryOrderByWithRelationInput;
	}): Promise<QuestionCategory[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.questionCategory.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		})
	}
}