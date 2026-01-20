import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from '../entities/category.entity';

import { ListAllDto } from '../dto/list-all.dto';
import { CreateCategoryDto } from '../dto/create-category';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(query: ListAllDto, userId: number) {
    try {
      const categories = await this.categoriesRepository.find({
        select: {
          id: true,
          name: true,
          description: true,
        },
        where: { user: { id: userId } },
        take: query.limit,
        skip: query.limit * (query.page - 1),
      });

      return {
        page: query.page,
        result: categories,
      };
    } catch (error) {
      // TODO: Save errors in a monitoring storage
      console.error(error);
      throw new BadRequestException();
    }
  }

  async create(createCategoryDto: CreateCategoryDto, userId: number) {
    try {
      const category = await this.categoriesRepository.save({
        name: createCategoryDto.name,
        description: createCategoryDto.description,
        user: { id: userId },
      });

      return {
        id: category.id,
        name: category.name,
        description: category.description,
        createdAt: category.createdAt,
      };
    } catch (error) {
      // TODO: Save errors in a monitoring storage
      console.error(error);
      throw new BadRequestException();
    }
  }
}
