import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SchoolAnnouncementsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.SchoolAnnouncementCreateInput) {
    return this.prisma.schoolAnnouncement.create({ data });
  }

  findAll() {
    return this.prisma.schoolAnnouncement.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
async findLatest() {
  return this.prisma.schoolAnnouncement.findFirst({
    orderBy: { createdAt: 'desc' },
  });
}
  findOne(id: number) {
    return this.prisma.schoolAnnouncement.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.SchoolAnnouncementUpdateInput) {
    return this.prisma.schoolAnnouncement.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.schoolAnnouncement.delete({ where: { id } });
  }
}
