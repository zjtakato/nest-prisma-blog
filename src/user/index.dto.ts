import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class LoginDto implements Partial<Prisma.UserUncheckedCreateInput> {
  @ApiProperty({
    description: '账号',
    default: 'shuaigebie',
  })
  account: string;

  @ApiProperty({
    description: '密码',
    default: '123456',
  })
  password: string;

  @ApiProperty({
    required: false,
    description: '用户名',
  })
  name?: string;
}

export interface UserGeneralDto extends Partial<Prisma.UserUncheckedCreateInput> {}
