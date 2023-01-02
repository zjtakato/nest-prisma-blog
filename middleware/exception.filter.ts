import { ArgumentsHost, ExceptionFilter as NestExceptionFilter, HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { Request, Response } from 'express';
import Config from '../config';

export class ExceptionFilter implements NestExceptionFilter {
  private readonly config: ConfigType<typeof Config>;
  constructor(private readonly configService: ConfigService) {
    this.config = configService.get('config');
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception?.getStatus ? exception.getStatus() : 500;
    response.status(status).json({
      ret: -1,
      msg: this.config.env !== 'production' ? exception.message : 'error',
    });
  }
}
