import { IsString } from 'class-validator';

export class CreateBlockDto {
  @IsString()
  type: string;

  @IsString()
  content: string;
}
