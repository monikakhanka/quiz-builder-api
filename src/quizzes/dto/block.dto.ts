import {
  IsString,
  IsBoolean,
  IsOptional,
  IsIn,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class HeadingBlockContentDto {
  @IsString()
  text: string;
}

export class HeadingBlockDto {
  @IsString()
  id: string;

  @IsIn(['heading'])
  type: 'heading';

  @ValidateNested()
  @Type(() => HeadingBlockContentDto)
  content: HeadingBlockContentDto;
}

export class QuestionBlockContentDto {
  @IsOptional()
  @IsIn(['multiple-choice', 'text'])
  questionType?: 'multiple-choice' | 'text';

  @IsString()
  question: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[];

  @IsOptional()
  @IsString()
  placeholder?: string;

  @IsOptional()
  answer?: string | string[];

  @IsOptional()
  @IsBoolean()
  multiple?: boolean;
}

export class QuestionBlockDto {
  @IsString()
  id: string;

  @IsIn(['question'])
  type: 'question';

  @ValidateNested()
  @Type(() => QuestionBlockContentDto)
  content: QuestionBlockContentDto;
}

export class ButtonBlockContentDto {
  @IsString()
  label: string;
}

export class ButtonBlockDto {
  @IsString()
  id: string;

  @IsIn(['button'])
  type: 'button';

  @ValidateNested()
  @Type(() => ButtonBlockContentDto)
  content: ButtonBlockContentDto;
}

export class FooterBlockContentDto {
  @IsString()
  text: string;
}

export class FooterBlockDto {
  @IsString()
  id: string;

  @IsIn(['footer'])
  type: 'footer';

  @ValidateNested()
  @Type(() => FooterBlockContentDto)
  content: FooterBlockContentDto;
}

export type BlockDto =
  | HeadingBlockDto
  | QuestionBlockDto
  | ButtonBlockDto
  | FooterBlockDto;
