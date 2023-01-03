import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const State = createParamDecorator((data: unknown, ctx: ExecutionContext): StateDto => {
  const request = ctx.switchToHttp().getRequest();
  return request.state as StateDto;
});

export interface StateDto extends Partial<Prisma.UserUncheckedCreateWithoutBlogInput> {}
