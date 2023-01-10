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
  @IsNotEmpty({
    message: '确认密码不能为空',
  })
  @ApiProperty({
    description: '确认密码',
    required: true,
  })
  confirmPassword: string;

  @IsString()
  @IsNotEmpty({
    message: '验证码不能为空',
  })
  @ApiProperty({
    description: '验证码',
    required: true,
  })
  verifiCode: string;

  @IsString()
  @IsNotEmpty({
    message: 'codeTicket不能为空',
  })
  @ApiProperty({
    description: '验证码凭证',
    required: true,
  })
  codeTicket: string;

  @IsString()
  @IsOptional()
  name?: string;
}
