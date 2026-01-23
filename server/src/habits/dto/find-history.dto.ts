import { IsDateString } from 'class-validator';

export class FindHistoryDto {
  @IsDateString()
  from: Date;

  @IsDateString()
  to: Date;
}
