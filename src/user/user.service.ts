import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from 'core/prisma/prisma.service';
import { UserPrismaGeneralDto } from './index.dto';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REQUEST)
    private readonly request: Request,
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

  async register(parmas: UserPrismaGeneralDto) {
    const user = await this.getUserByAccount(parmas.account);
    if (user) {
      throw new Error('该用户已存在');
    }
    const { id } = await this.prisma.user.create({
      data: {
        account: parmas.account,
        password: parmas.password,
        name: parmas.name,
      },
    });
    return id;
  }
}
