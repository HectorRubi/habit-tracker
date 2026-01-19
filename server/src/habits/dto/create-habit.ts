import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateHabitDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description: string;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  periodicityId: number;

  @IsNumber()
  userId: number;
}
