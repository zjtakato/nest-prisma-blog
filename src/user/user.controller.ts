import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginDto } from './index.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() { account, password }: LoginDto, @Res() res: Response) {
    const result = await this.userService.login(account, password);
    if (!result) throw new Error('账号或密码错误');
    res.cookie('blogAccessToken', 'abcdeft');
    res.json({
      ret: 0,
      msg: '登录成功',
    });
  }

  @Post('register')
  async register(@Body() params: LoginDto) {
    const id = await this.userService.register(params);
    return {
      ret: 0,
      msg: '注册成功',
      data: { id },
    };
  }
}
