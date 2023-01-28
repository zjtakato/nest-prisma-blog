import { Injectable } from '@nestjs/common';
import { PrismaService } from 'core/prisma/prisma.service';

@Injectable()
export class SystemService {
  constructor(private readonly prismaService: PrismaService) {}
  async getMenuList(sort: 'asc' | 'desc' = 'asc') {
    return await this.prismaService.menu.findMany({
      orderBy: {
        sort: sort,
      },
    });
  }
}
