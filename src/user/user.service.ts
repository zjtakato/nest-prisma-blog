import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from 'core/prisma/prisma.service';
import { RegisterValidatorDto, UserUniversalDto } from './index.dto';
import Config from 'config';
import { ConfigType } from '@nestjs/config';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REQUEST)
    private readonly request: Request,
    @Inject(Config.KEY)
    private readonly config: ConfigType<typeof Config>,
  ) {}

  async login(account: string, password: string) {
    return await this.prisma.user.findFirst({
      where: { account, password },
    });
  }

  async getUserByAccount(account: string) {
    return this.prisma.user.findUnique({
      where: { account },
    });
  }

  async register(parmas: RegisterValidatorDto) {
    const user = await this.getUserByAccount(parmas.account);
    if (user) {
      throw new HttpException('该用户已存在', this.config.forbiddenStatus);
    }
    const result = await this.prisma.user.create({
      data: {
        account: parmas.account,
        password: parmas.password,
        name: parmas.name,
      },
    });
    return result;
  }
}
