import { IsString, IsBoolean, IsArray, ValidateNested } from 'class-validator';
export class CreateQuizDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  blocks: any;

  @IsBoolean()
  published: boolean;
}
