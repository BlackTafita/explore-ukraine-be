import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/services/prisma.service';
import { Prisma, Question } from '@prisma/client';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async createQuestion(data: Prisma.QuestionCreateInput): Promise<Question> {
    return this.prisma.question.create({ data });
  }

  async createManyQuestions(data: Prisma.QuestionCreateManyArgs): Promise<Prisma.BatchPayload> {
    return this.prisma.question.createMany(data);
  }

  async question(where: Prisma.QuestionWhereUniqueInput): Promise<Question> {
    return this.prisma.question.findUnique({
      where,
    });
  }

  async questions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.QuestionWhereUniqueInput;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput;
    select?: Prisma.QuestionSelect,
  }): Promise<Question[]> {
    const { skip, take, cursor, where, orderBy, select } = params;
    return this.prisma.question.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select,
    });
  }

  async updateQuestion(params: {
    where: Prisma.QuestionWhereUniqueInput;
    data: Prisma.QuestionUpdateInput;
  }): Promise<Question> {
    const { where, data } = params;
    return this.prisma.question.update({
      data,
      where,
    });
  }

  async deleteQuestion(
    where: Prisma.QuestionWhereUniqueInput,
  ): Promise<Question> {
    return this.prisma.question.delete({
      where,
    });
  }

  async getQuestionsPoll(categoryId: string): Promise<Question[]> {
    const questionIds = await this.questions({
      where: {
        questionCategoryId: Number(categoryId),
      },
      select: {
        id: true,
      }
    }) as unknown as { id: number }[];

    // get random
    const selectedIds = [];
    while (true) {
      if (selectedIds.length === 10) {
        break;
      }
      const num = Math.floor(Math.random() * questionIds.length + 1);
      if (questionIds[num] && selectedIds.findIndex(el => el?.id === questionIds[num].id) === -1) {
        selectedIds.push(questionIds[num].id);
      }
    }

    return this.questions({
      where: {
        id: {
          in: selectedIds,
        },
      },
    });

  }
}
