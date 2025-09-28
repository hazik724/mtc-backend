import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SchoolReviewsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.SchoolReviewCreateInput) {
    return this.prisma.schoolReview.create({ data });
  }

  findAll() {
    return this.prisma.schoolReview.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.schoolReview.findUnique({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.schoolReview.delete({ where: { id } });
  }
}
