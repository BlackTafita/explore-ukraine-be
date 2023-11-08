import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Question as QuestionModel } from '@prisma/client';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}


  @Get('game')
  async getQuestionsForGame(@Query('categoryId') category: string): Promise<QuestionModel[]> {
    return this.questionService.getQuestionsPoll(category);
  }

  @Get(':id')
  async getQuestion(@Param('id') id: string): Promise<QuestionModel> {
    return this.questionService.question({ id: Number(id) });
  }

  @Post()
  async createQuestion(
    @Body() createDto: CreateQuestionDto,
  ): Promise<QuestionModel> {
    return this.questionService.createQuestion({
      ...createDto,
      category: {
        connect: {
          id: createDto.categoryId,
        }
      }
    });
  }
}
