import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import cloudinary from 'src/cloudinary';

@Injectable()
export class SchoolGalleryService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.SchoolGalleryCreateInput) {
    return this.prisma.schoolGallery.create({ data });
  }

  findAll() {
    return this.prisma.schoolGallery.findMany({ orderBy: { createdAt: "desc" } });
  }

  findOne(id: number) {
    return this.prisma.schoolGallery.findUnique({ where: { id } });
  }

  async remove(id: number) {
    const item = await this.prisma.schoolGallery.findUnique({ where: { id } });
    if (!item) throw new Error("Gallery item not found");

    // ✅ delete from Cloudinary as well
    if (item.publicId) {
      await cloudinary.uploader.destroy(item.publicId);
    }

    return this.prisma.schoolGallery.delete({ where: { id } });
  }
}