import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // constructor() {
  //   super();
  //   const self = this.user;
  //   // @ts-ignore
  //   this.user = {
  //     ...this.user,
  //     async findFirst(params) {
  //       const result = await self.findFirst(params);
  //       if (result.password) {
  //         delete result.password;
  //       }
  //       return result;
  //     },
  //     async findUnique(params) {
  //       const result = await self.findUnique(params);
  //       if (result.password) {
  //         delete result.password;
  //       }
  //       return result;
  //     },
  //   };
  // }
  async onModuleInit() {
    await this.$connect();
  }
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
