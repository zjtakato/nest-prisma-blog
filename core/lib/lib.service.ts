import { Injectable } from '@nestjs/common';

@Injectable()
export class LibService {
  /**
   * 随机生成字符串
   * @param length 字符串的长度，默认为32
   */
  randomString(length = 32): string {
    const str = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += str.charAt(Math.floor(Math.random() * str.length));
    }
    return result;
  }
}
