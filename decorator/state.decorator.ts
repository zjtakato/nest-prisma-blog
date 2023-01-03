import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const State = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest();

  return request.state as User;
});
