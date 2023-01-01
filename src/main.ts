import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // swagger
  const optipns = new DocumentBuilder().setTitle('Blog example').setDescription('The Blog API description').setVersion('1.0').addTag('Blog').build();
  const docuemnt = SwaggerModule.createDocument(app, optipns);
  SwaggerModule.setup('api', app, docuemnt);

  // config
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('config.port');

  await app.listen(port).then(() => {
    console.log(`swagger running in http://localhost:${port}/api`);
    console.log(`server running in http://localhost:${port}`);
  });
}
bootstrap();
