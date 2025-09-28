import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AnnouncementsModule } from './announcements/announcements.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ApplicationsModule } from './applications/applications.module';
import { ContactsModule } from './contacts/contacts.module';
import { JobsModule } from './jobs/job.module';
import { AuthModule } from './auth/auth.module';
import { SchoolAnnouncementsModule } from './school-announcements/school-announcements.module';
import { SchoolReviewsModule } from './school-reviews/school-reviews.module';
import { SchoolGalleryModule } from './school-gallery/school-gallery.module';

@Module({
  imports: [
    // 👇 Serve /public/uploads as /uploads/*
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'uploads'),
      serveRoot: '/uploads',
       serveStaticOptions: {
    index: false, // 🚀 do not look for index.html
  },
    }),

    AnnouncementsModule,
    PrismaModule,
    ReviewsModule,
    JobsModule,
    ApplicationsModule,
    ContactsModule,
    AuthModule,
    SchoolAnnouncementsModule,
    SchoolReviewsModule,
    SchoolGalleryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
