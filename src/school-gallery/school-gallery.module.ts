import { Module } from '@nestjs/common';
import { SchoolGalleryService } from './school-gallery.service';
import { SchoolGalleryController } from './school-gallery.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SchoolGalleryController],
  providers: [SchoolGalleryService, PrismaService],
})
export class SchoolGalleryModule {}
