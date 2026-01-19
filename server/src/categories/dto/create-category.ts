import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description: string;
}
