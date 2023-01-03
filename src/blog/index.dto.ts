import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class BlogSwaggerGeneralDto implements Partial<Prisma.BlogUncheckedCreateWithoutUserInput> {
  @ApiProperty({
    description: `博客id - '更新/删除'必传`,
    default: 0,
    required: false,
  })
  public id?: number;

  @ApiProperty({
    description: `标题 - '新增/更新'必传`,
    default: '这是标题',
    required: false,
  })
  public title?: string;
  @ApiProperty({
    description: `内容 - '新增/更新'必穿`,
    default: '这是标题',
    required: false,
  })
  public content?: string;
}

export interface BlogPrismaGeneralDto extends Partial<Prisma.BlogUncheckedCreateInput> {}
