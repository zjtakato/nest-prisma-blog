import { ApiProperty } from '@nestjs/swagger';
import { Blog } from '@prisma/client';

export class BlogDto implements Blog {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public userId: number;

  @ApiProperty({
    description: '标题',
  })
  public title: string;
  @ApiProperty({
    description: '内容',
  })
  public content: string;
}
