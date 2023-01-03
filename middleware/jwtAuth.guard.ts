import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { PrismaService } from 'core/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import Config from 'config';

interface CookiesDto {
  blogAccessToken?: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly config: ConfigType<typeof Config>;
  constructor(private readonly prismaService: PrismaService, private readonly configService: ConfigService, private readonly jwtService: JwtService) {
    this.config = configService.get('config');
  }
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const { blogAccessToken } = request.cookies as CookiesDto;
    try {
      const state = this.jwtService.verify(blogAccessToken) as User;
      request.state = state;
    } catch (error) {
      console.log(error.stack);
      throw new Error('登录态异常');
    }
    // jwt验证
    return true;
  }
}
