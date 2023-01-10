import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService, ConfigType } from '@nestjs/config';
import { ExceptionFilter } from 'middleware/exception.filter';
import Config from '../config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from 'middleware/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // swagger
  const optipns = new DocumentBuilder().setTitle('Blog example').setDescription('The Blog API description').setVersion('1.0').build();
  const docuemnt = SwaggerModule.createDocument(app, optipns);
  SwaggerModule.setup('api', app, docuemnt);

  // config
  const configService = app.get<ConfigService>(ConfigService);
  const { port, env } = configService.get('config') as ConfigType<typeof Config>;

  // parser cookies
  app.use(cookieParser());

  // mount filter
  const expectionFilter = app.get(ExceptionFilter);
  app.useGlobalFilters(expectionFilter);

  // mount pipe
  const validationPipe = app.get(ValidationPipe);
  app.useGlobalPipes(validationPipe);

  // cors
  env() !== 'prod' && app.enableCors();

  await app.listen(port).then(() => {
    console.log(`swagger running in http://localhost:${port}/api`);
    console.log(`server running in http://localhost:${port}`);
  });
}
bootstrap();
