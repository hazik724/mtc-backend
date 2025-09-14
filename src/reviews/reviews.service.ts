import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  create(CreateReviewDto: Prisma.ReviewsCreateInput) {
    return this.prisma.reviews.create({ data: CreateReviewDto });
  }

  findAll() {
    return this.prisma.reviews.findMany();
  }

  findOne(id: number) {
    return this.prisma.reviews.findUnique({ where: { id } });
  }

  update(id: number, UpdateReviewDto : Prisma.ReviewsUpdateInput) {
    return this.prisma.reviews.update({ where: { id }, data: UpdateReviewDto });
  }

  remove(id: number) {
    return this.prisma.reviews.delete({ where: { id } });
  }
}
