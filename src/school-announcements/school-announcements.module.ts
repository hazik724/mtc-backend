import { Module } from '@nestjs/common';
import { SchoolAnnouncementsService } from './school-announcements.service';
import { SchoolAnnouncementsController } from './school-announcements.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SchoolAnnouncementsController],
  providers: [SchoolAnnouncementsService, PrismaService],
})
export class SchoolAnnouncementsModule {}
