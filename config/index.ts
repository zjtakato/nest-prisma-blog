import { registerAs } from '@nestjs/config';
export default registerAs('config', () => {
  return {
    port: 3000,
    jwtSecert: process.env.JWT_SECRET,
    jwtExpires: '60m',
    env: (): 'local' | 'prod' => {
      return (process.env.NODE_ENV as 'prod') || 'local';
    },
    forbiddenStatus: 403, // 业务错误状态码(服务器理解请求客户端的请求，但是拒绝执行此请求)
  };
});
