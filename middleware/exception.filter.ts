import { ArgumentsHost, ExceptionFilter as NestExceptionFilter, HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Request, Response } from 'express';
import Config from '../config';

@Injectable()
export class ExceptionFilter implements NestExceptionFilter {
  constructor(
    @Inject(Config.KEY)
    private readonly config: ConfigType<typeof Config>,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception?.getStatus ? exception.getStatus() : this.config.serverErrorStatus;
    let errorMessage: string;
    const stackWhiteList = [this.config.forbiddenStatus, this.config.badRequestStatus, this.config.unAuthorizedStatus];
    if (stackWhiteList.includes(status)) {
      // 业务错误
      errorMessage = exception.message;
    } else {
      // 代码错误
      errorMessage = this.config.serverErrorMessage;
      console.log(exception.stack);
    }
    response.status(status).json({
      ret: -1,
      msg: errorMessage,
    });
  }
}
