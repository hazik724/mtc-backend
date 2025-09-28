import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SchoolReviewsService } from './school-reviews.service';
import { Prisma } from '@prisma/client';

@Controller('school/reviews')
export class SchoolReviewsController {
  constructor(private readonly service: SchoolReviewsService) {}

  @Post()
  create(@Body() body: Prisma.SchoolReviewCreateInput) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
