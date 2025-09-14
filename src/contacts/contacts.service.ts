import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(CreateContactDto: Prisma.ContactCreateInput) {
    return this.prisma.contact.create({ data: CreateContactDto });
  }

  async findAll() {
    return this.prisma.contact.findMany();
  }

  async findOne(id: number) {
    return this.prisma.contact.findUnique({ where: { id } });
  }

  async update(id: number, UpdateContactDto : Prisma.ContactUpdateInput) {
    return this.prisma.contact.update({ where: { id }, data:UpdateContactDto });
  }

  async remove(id: number) {
    return this.prisma.contact.delete({ where: { id } });
  }
}
