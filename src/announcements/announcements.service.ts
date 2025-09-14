import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AnnouncementsService {
  constructor(private prisma: PrismaService) {}

  async create(CreateAnnouncementDto : Prisma.AnnouncementCreateInput) {
    return this.prisma.announcement.create({data: CreateAnnouncementDto});
  }

async findAll() {
  return this.prisma.announcement.findMany({
    orderBy: { createdAt: 'desc' }, // newest first
  });
}

async findLatest() {
  return this.prisma.announcement.findFirst({
    orderBy: { createdAt: 'desc' },
  });
}

  async  findOne(id: number) {
    return this.prisma.announcement.findUnique({ where: { id} });
  }

  async  update(id: number, UpdateAnnouncementDto: Prisma.AnnouncementUpdateInput) {
    return this.prisma.announcement.update({ where: { id }, data: UpdateAnnouncementDto });
  }

  remove(id: number) {
    return this.prisma.announcement.delete({ where: { id } });
  }
}

