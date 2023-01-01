import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const optipns = new DocumentBuilder()
    .setTitle('Blog example')
    .setDescription('The Blog API description')
    .setVersion('1.0')
    .addTag('Blog')
    .build();
  const docuemnt = SwaggerModule.createDocument(app, optipns);
  SwaggerModule.setup('api', app, docuemnt);
  await app.listen(3000);
}
bootstrap().then(() => {
  console.log('swagger running in http://127.0.0.1:3000/api');
  console.log('server running in http://localhost:3000');
});
