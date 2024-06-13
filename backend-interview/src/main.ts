import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  const swaggerOptions = new DocumentBuilder()
  .setTitle('Backend Interview')
  .setDescription(`Backend Interview Docs`)
  .build()
  const document = SwaggerModule.createDocument(app,swaggerOptions);
    SwaggerModule.setup(`api-docs`, app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        }
    });
  await app.listen(3000);
}
bootstrap();
