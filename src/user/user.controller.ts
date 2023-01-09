import { Body, Controller, HttpException, Inject, Post, Res } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserUniversalDto } from './index.dto';
import { UserService } from './user.service';
import Config from 'config';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(Config.KEY)
    private readonly config: ConfigType<typeof Config>,
  ) {}

  @Post('login')
  async login(@Body() { account, password }: UserUniversalDto, @Res() res: Response) {
    const result = await this.userService.login(account, password);
    if (!result) throw new HttpException('账号或密码错误', this.config.forbiddenStatus);
    const token = this.jwtService.sign({ ...result });
    res.cookie('token', token);
    res.header('Access-Control-Expose-Headers', 'token');
    res.header('token', token);
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
