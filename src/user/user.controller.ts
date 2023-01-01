import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './index.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() { account, password }: LoginDto) {
    const result = await this.userService.login(account, password);
    if (!result) throw new Error('账号或密码错误');
    return {
      ret: 0,
      msg: '登录成功',
    };
  }
}
