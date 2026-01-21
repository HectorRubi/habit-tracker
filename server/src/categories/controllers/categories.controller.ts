import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CategoriesService } from '../services/categories.service';
import { User } from '../../auth/decorators/user.decorator';
import { UserEntity } from '../../users/entities/user.entity';
import { CreateCategoryDto } from '../dto/create-category';
import { UpdateCategoryDto } from '../dto/update-category';
import { ListAllDto } from '../dto/list-all.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(@Query() query: ListAllDto, @User() user: UserEntity) {
    if (!query.limit) {
      query.limit = 10;
    }

    if (!query.page) {
      query.page = 0;
    }

    return await this.categoriesService.findAll(query, user.id);
  }

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @User() user: UserEntity,
  ) {
    return await this.categoriesService.create(createCategoryDto, user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `This action returns category with id: ${id}`;
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return `This action updates category with id: ${id} with data: ${JSON.stringify(updateCategoryDto)}`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return `This action removes category with id: ${id}`;
  }
}
