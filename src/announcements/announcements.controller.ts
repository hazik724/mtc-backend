import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { Prisma } from '@prisma/client';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  create(@Body() createAnnouncementDto: Prisma.AnnouncementCreateInput) {
    return this.announcementsService.create(createAnnouncementDto);
  }

  @Get()
  findAll() {
    return this.announcementsService.findAll();
  }

  @Get("latest")
   findLatest() {
    return this.announcementsService.findLatest();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.announcementsService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnnouncementDto: Prisma.AnnouncementUpdateInput) {
    return this.announcementsService.update(+id, updateAnnouncementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.announcementsService.remove(+id);
  }
}
