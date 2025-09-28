import { Module } from '@nestjs/common';
import { SchoolReviewsService } from './school-reviews.service';
import { SchoolReviewsController } from './school-reviews.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SchoolReviewsController],
  providers: [SchoolReviewsService, PrismaService],
})
export class SchoolReviewsModule {}
