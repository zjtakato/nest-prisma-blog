import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class BlogUniversalDto implements Partial<Prisma.BlogUncheckedCreateInput> {
  /** user表主键id */
  public userId?: number;

  /** 博客id - '更新/删除'必传 */
  @ApiProperty({
    description: `博客id - '更新/删除'必传`,
    default: 0,
    required: false,
  })
  public id?: number;

  /** 标题 - '新增/更新'必传 */
  @ApiProperty({
    description: `标题 - '新增/更新'必传`,
    default: '这是标题',
    required: false,
  })
  public title?: string;

  /** 内容 - '新增/更新'必穿 */
  @ApiProperty({
    description: `内容 - '新增/更新'必穿`,
    default: '这是标题',
    required: false,
  })
  public content?: string;
}
