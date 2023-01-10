import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserUniversalDto implements Partial<Prisma.UserUncheckedCreateInput> {
  @ApiProperty({
    description: `账号 - '登录/注册'必传`,
    default: 'shuaigebie',
    required: false,
  })
  account?: string;

  @ApiProperty({
    description: `密码 - '登录/注册'必传`,
    default: '123456',
    required: false,
  })
  password?: string;

  @ApiProperty({
    description: `用户名 - '注册必传'`,
    default: '这是用户名',
    required: false,
  })
  name?: string;
}

export class RegisterValidatorDto {
  @IsString()
  @IsNotEmpty({
    message: 'account不能为空',
  })
  @ApiProperty({
    description: '账号',
    required: true,
  })
  account: string;

  @IsString()
  @IsNotEmpty({
    message: 'password不能为空',
  })
  @ApiProperty({
    description: '密码',
    required: false,
  })
  password: string;

  @IsString()
  @IsOptional()
  name?: string;
}
