import { Body, Controller, Get, HttpException, Inject, Post, Res } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RegisterValidatorDto, UserUniversalDto } from './index.dto';
import { UserService } from './user.service';
import Config from 'config';
import { LibService } from 'core/lib/lib.service';
import * as svgCaptcha from 'svg-captcha';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(Config.KEY)
    private readonly config: ConfigType<typeof Config>,
    private readonly libService: LibService,
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
  async register(@Body() params: RegisterValidatorDto, @Res() res: Response) {
    // 校验两次密码是否一致
    if (params.password !== params.confirmPassword) {
      throw new HttpException('密码与确认密码不一致', this.config.forbiddenStatus);
    }
    params.verifiCode = params.verifiCode.toLocaleLowerCase();
    // 校验验证码是否正确以及有效性
    const validateSecretCodeResult = this.libService.validateCode(params.verifiCode, params.codeTicket);
    if (validateSecretCodeResult === false) {
      throw new HttpException('验证码无效', this.config.forbiddenStatus);
    }
    const result = await this.userService.register(params);
    const token = this.jwtService.sign({ ...result });
    res.cookie('token', token);
    res.header('Access-Control-Expose-Headers', 'token');
    res.header('token', token);
    res.json({
      ret: 0,
      msg: '注册成功',
      data: {
        id: result.id,
      },
    });
  }

  @Get('getVerifiCode')
  async getVerifiCode() {
    const captcha = svgCaptcha.create();
    const code = captcha.text.toLocaleLowerCase();
    const encryptCode = this.libService.md5Decode(code); // 对验证码进行加密
    const codeTicket = this.jwtService.sign({ encryptCode }); // 进行jwt加密
    return {
      ret: 0,
      msg: 'success',
      data: {
        codeTicket,
        svg: captcha.data,
      },
    };
  }
}
