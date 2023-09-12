import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Question as QuestionModel } from '@prisma/client';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get(':id')
  async getQuestion(@Param('id') id: string): Promise<QuestionModel> {
    return this.questionService.question({ id: Number(id) });
  }

  @Post()
  async createQuestion(
    @Body() createDto: CreateQuestionDto,
  ): Promise<QuestionModel> {
    return this.questionService.createQuestion(createDto);
  }
}
