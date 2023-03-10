import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { UserModule } from './user/user.module';
import Config from '../config';
import { JwtModule } from '@nestjs/jwt';
import { BlogModule } from './blog/blog.module';
import { PrismaModule } from 'core/prisma/prisma.module';
import { ExceptionFilter } from 'middleware/exception.filter';
import { LibModule } from 'core/lib/lib.module';
import { ValidationPipe } from 'middleware/validation.pipe';
import { SystemModule } from './system/system.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Config],
      isGlobal: true,
    }),
    {
      ...JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          const config = configService.get<ConfigType<typeof Config>>('config');
          return {
            secret: config.jwtSecert,
            signOptions: { expiresIn: config.jwtExpires },
          };
        },
        inject: [ConfigService],
      }),
      global: true,
    },
    UserModule,
    BlogModule,
    PrismaModule,
    LibModule,
    SystemModule,
  ],
  providers: [ExceptionFilter, ValidationPipe],
})
export class AppModule {}
