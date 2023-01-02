import { registerAs } from '@nestjs/config';
export default registerAs('config', () => {
  return {
    port: 3000,
    jwtSecert: process.env.JWT_SECRET,
    jwtExpires: '60m',
    env: process.env.NODE_ENV,
  };
});
