// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    "http://localhost:3000",                 // dev frontend
    process.env.FRONTEND_URL as string,      // production frontend (from env)
  ].filter(Boolean);

  console.log("✅ CORS allowed origins:", allowedOrigins);

  app.use(cookieParser());

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`❌ Blocked by CORS: ${origin}`);
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  });

  // ✅ Serve static uploads correctly (works in dev & prod)
  app.use("/uploads", express.static(join(process.cwd(), "public", "uploads")));

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
