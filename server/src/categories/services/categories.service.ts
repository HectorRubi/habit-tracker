import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

import { CategoryEntity } from '../entities/category.entity';
import { PaginationQueriesDto } from '../../utils/dto/pagination-queries.dto';
import { ERROR } from '../../utils/constants/errors';
import { CreateCategoryDto } from '../dto/create-category';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(query: PaginationQueriesDto, userId: number) {
    const limit = query.limit || 10;
    const page = query.page || 1;

    try {
      const categories = await this.categoriesRepository.find({
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updateAt: true,
        },
        where: { user: { id: userId } },
        take: limit,
        skip: limit * (page - 1),
      });

      return {
        page: parseInt(`${page}`, 10),
        result: categories,
      };
    } catch (error) {
      throw new ServiceUnavailableException(ERROR.SERVICE_UNAVAILABLE, {
        cause: error,
      });
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.categoriesRepository.findOneOrFail({
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updateAt: true,
        },
        where: { id },
        relations: { habits: true },
      });
      return category;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Category not found', { cause: error });
      } else {
        throw new ServiceUnavailableException(ERROR.SERVICE_UNAVAILABLE, {
          cause: error,
        });
      }
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
      throw new ServiceUnavailableException(ERROR.SERVICE_UNAVAILABLE, {
        cause: error,
      });
    }
  }
}
