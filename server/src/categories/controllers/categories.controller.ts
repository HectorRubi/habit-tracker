import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category';
import { UpdateCategoryDto } from '../dto/update-category';

@Controller('categories')
export class CategoriesController {
  @Get()
  findAll() {
    return 'This action returns all categories';
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return `This action adds a new category with data: ${JSON.stringify(createCategoryDto)}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns category with id: ${id}`;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return `This action updates category with id: ${id} with data: ${JSON.stringify(updateCategoryDto)}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes category with id: ${id}`;
  }
}
