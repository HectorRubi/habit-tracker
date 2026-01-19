import { IsDate } from 'class-validator';

export class CheckHabitDto {
  @IsDate()
  date: Date;
}
