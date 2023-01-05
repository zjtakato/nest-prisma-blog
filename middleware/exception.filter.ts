import { ArgumentsHost, ExceptionFilter as NestExceptionFilter, HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { Request, Response } from 'express';
import Config from '../config';

@Injectable()
export class ExceptionFilter implements NestExceptionFilter {
  private readonly config: ConfigType<typeof Config>;
  constructor(private readonly configService: ConfigService) {
    this.config = configService.get('config');
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception?.getStatus ? exception.getStatus() : this.config.serverErrorStatus;
    // 非业务错误才打印stack
    status !== this.config.forbiddenStatus && console.log(exception.stack);
    // 业务错误时把错误信息作为响应
    const errorMessage = status === this.config.forbiddenStatus ? exception.message : this.config.serverErrorMessage;
    response.status(status).json({
      ret: -1,
      msg: errorMessage,
    });
  }
}
