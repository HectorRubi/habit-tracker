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

import { CreateCategoryDto } from '../dto/create-category';
import { UpdateCategoryDto } from '../dto/update-category';
import { ListAllDto } from '../dto/list-all.dto';

@Controller('categories')
export class CategoriesController {
  // TODO: JWT implementation to get user id
  private USER_ID = 5;

  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(@Query() query: ListAllDto) {
    if (!query.limit) {
      query.limit = 10;
    }

    if (!query.page) {
      query.page = 0;
    }

    return await this.categoriesService.findAll(query, this.USER_ID);
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto, this.USER_ID);
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
