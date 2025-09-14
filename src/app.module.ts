import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { AnnouncementsModule } from './announcements/announcements.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ApplicationsModule } from './applications/applications.module';
import { ContactsModule } from './contacts/contacts.module';
import { JobsModule } from './jobs/job.module';


@Module({
  imports: [AnnouncementsModule,PrismaModule,ReviewsModule,JobsModule,ApplicationsModule,ContactsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
