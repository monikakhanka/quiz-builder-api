import {
  IsString,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  HeadingBlockDto,
  QuestionBlockDto,
  ButtonBlockDto,
  FooterBlockDto,
} from './block.dto';

export class CreateQuizDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: HeadingBlockDto, name: 'heading' },
        { value: QuestionBlockDto, name: 'question' },
        { value: ButtonBlockDto, name: 'button' },
        { value: FooterBlockDto, name: 'footer' },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  blocks: (
    | HeadingBlockDto
    | QuestionBlockDto
    | ButtonBlockDto
    | FooterBlockDto
  )[];

  @IsBoolean()
  published: boolean;

  @IsOptional()
  @IsString()
  updatedAt?: string;
}
