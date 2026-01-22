import { IsDateString } from 'class-validator';

export class CheckHabitDto {
  @IsDateString()
  date: Date;
}
