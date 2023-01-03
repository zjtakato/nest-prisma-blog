import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { SearchPaginationBase } from 'types/index.dto';

@Injectable()
export class BlogService {
  constructor(private readonly prismService: PrismaService) {}

  async getBlogListByPage(params: SearchPaginationBase, userId: number) {
    return await this.prismService.blog.findMany({
      where: {
        userId: userId,
      },
      skip: +params.pageSize * (+params.currentPage - 1),
      take: +params.pageSize,
    });
  }
  async createBlog(params: Prisma.BlogUncheckedCreateInput) {
    return await this.prismService.blog.create({
      data: {
        ...params,
        userId: params.userId,
      },
    });
  }

  async updateBlogById(id: number, userId, paramas: Prisma.BlogUpdateInput) {
    return await this.prismService.blog.update({
      where: {
        id: id,
        userId: userId,
      },
      data: paramas,
    });
  }

  async deleteBlogById(id: number, userId: number) {
    return await this.prismService.blog.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
