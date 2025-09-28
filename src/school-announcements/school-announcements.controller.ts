import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchoolAnnouncementsService } from './school-announcements.service';
import { Prisma } from '@prisma/client';

@Controller('school/announcements')
export class SchoolAnnouncementsController {
  constructor(private readonly service: SchoolAnnouncementsService) {}

  @Post()
  create(@Body() body: Prisma.SchoolAnnouncementCreateInput) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
  @Get("latest")
   findLatest() {
    return this.service.findLatest();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Prisma.SchoolAnnouncementUpdateInput) {
    return this.service.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
