import { HttpException } from '@nestjs/common';
import Config from 'config';

export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(message, Config().forbiddenStatus);
  }
}
