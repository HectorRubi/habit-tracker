import { PartialType } from '@nestjs/mapped-types';

import { CreateHabitDto } from './create-habit';

export class UpdateHabitDto extends PartialType(CreateHabitDto) {}
