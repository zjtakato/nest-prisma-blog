import { ApiProperty } from '@nestjs/swagger';

export class SearchPaginationBase {
  /** 页数 */
  @ApiProperty({
    description: '当前页数',
    default: 1,
  })
  currentPage?: string;

  /** 页码 */
  @ApiProperty({
    description: '页码',
    default: 10,
  })
  pageSize?: string;
}

export type Tree<T1, T2> = {
  [P in keyof T1]: T1[P];
} & { [P in keyof T2]?: Array<Tree<T1, T2>> };
