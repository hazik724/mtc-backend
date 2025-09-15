import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

  console.log("CORS allowed origin:", allowedOrigin); // 🔍 check if correct

  app.enableCors({
    origin: allowedOrigin,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
