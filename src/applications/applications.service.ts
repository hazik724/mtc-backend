import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(CreateApplicationDto: Prisma.ApplicationCreateInput ) {
    return this.prisma.application.create({ 
      data: CreateApplicationDto
    });
  }

   async findAll() {
    return this.prisma.application.findMany();
  }

  async findOne(id: number) {
    return this.prisma.application.findUnique({ where: { id } });
  }

  async update(id: number , updateApplicationDto: Prisma.ApplicationUpdateInput) {
    return this.prisma.application.update({ where: { id }, data: updateApplicationDto });
  }

  async remove(id: number) {
    return this.prisma.application.delete({ where: { id } });
  }
}
  

