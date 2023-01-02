import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import config from '../config';
import { JwtModule } from '@nestjs/jwt';
import { BlogModule } from './blog/blog.module';
import { PrismaModule } from './core/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    {
      ...JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('config.jwtSecert'),
          signOptions: { expiresIn: configService.get<string>('config.jwtExpires') },
        }),
        inject: [ConfigService],
      }),
      global: true,
    },
    UserModule,
    BlogModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
