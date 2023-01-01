import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
