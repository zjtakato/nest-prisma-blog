import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class BlogDto implements Partial<Prisma.BlogUncheckedCreateWithoutUserInput> {
  @ApiProperty({
    description: 'id-更新操作才上传',
    default: 0,
    required: false,
  })
  public id?: number;

  @ApiProperty({
    description: '标题',
  })
  public title: string;
  @ApiProperty({
    description: '内容',
  })
  public content: string;
}

export class BlogDeleteDto implements Partial<Prisma.BlogUncheckedCreateWithoutUserInput> {
  @ApiProperty({
    description: '博客id',
    default: 0,
  })
  public id?: number;
}
