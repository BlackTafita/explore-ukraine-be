import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  answers: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  correct: number;
}
