import { ApiProperty } from '@nestjs/swagger';

export class SearchPaginationBase {
  @ApiProperty({
    description: '当前页数',
    default: 1,
  })
  currentPage?: number;

  @ApiProperty({
    description: '页码',
    default: 10,
  })
  pageSize?: number;
}
