import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PrismaService } from 'core/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import Config from 'config';
interface CookiesDto {
  token?: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(Config.KEY)
    private readonly config: ConfigType<typeof Config>,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const token = (request.cookies as CookiesDto).token || request.headers.token;
    try {
      const state = this.jwtService.verify(token) as User;
      request.state = state;
    } catch (error) {
      throw new Error('登录态异常');
    }
    // jwt验证
    return true;
  }
}
