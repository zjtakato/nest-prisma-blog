import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async login(account: string, password: string) {
    const data = await this.prisma.user.findFirst({
      where: { account, password },
    });
    if (data) {
      // 颁发cookie
      return true;
    } else {
      return false;
    }
  }
}
