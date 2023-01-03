import { Body, Controller, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserUniversalDto } from './index.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  @Post('login')
  async login(@Body() { account, password }: UserUniversalDto, @Res() res: Response) {
    const result = await this.userService.login(account, password);
    if (!result) throw new Error('账号或密码错误');
    const blogAccessToken = this.jwtService.sign({ ...result });
    res.cookie('blogAccessToken', blogAccessToken);
    res.json({
      ret: 0,
      msg: '登录成功',
    });
  }

  @Post('register')
  async register(@Body() params: UserUniversalDto) {
    const id = await this.userService.register(params);
    return {
      ret: 0,
      msg: '注册成功',
      data: { id },
    };
  }
}
