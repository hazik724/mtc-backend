import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createJobDto: Prisma.jobCreateInput) {
    return this.prisma.job.create({ data: createJobDto });
  }

  findAll() {
    return this.prisma.job.findMany();
  }

  findOne(id: number) {
    return this.prisma.job.findUnique({ where: { id } });
  }

  update(id: number, updateJobDto: Prisma.jobUpdateInput) {
    return this.prisma.job.update({ where: { id }, data: updateJobDto });
  }

  remove(id: number) {
    return this.prisma.job.delete({ where: { id } });
  }
}
