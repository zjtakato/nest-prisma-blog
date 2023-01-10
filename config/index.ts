import { registerAs } from '@nestjs/config';

const Config = registerAs('config', () => {
  return {
    port: 3000,
    jwtSecert: process.env.JWT_SECRET,
    jwtExpires: '60m',
    env: (): 'local' | 'prod' => {
      return (process.env.NODE_ENV as 'prod') || 'local';
    },
    forbiddenStatus: 403, // 业务错误状态码
    serverErrorStatus: 500, // 服务器内部异常
    badRequestStatus: 400, // 参数错误状态码
    serverErrorMessage: 'Internal Server Error',
    verifiCodeExpiresSecond: 90, // 验证码有效时间
  };
});

export default Config;
