import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as crybto from 'crypto';
import Config from 'config';
import { Tree } from 'types/index.dto';

@Injectable()
export class LibService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(Config.KEY)
    private readonly config: ConfigType<typeof Config>,
  ) {}
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

  /** 获取当前秒级时间戳 */
  nowSecondTimestamp(): number {
    return Math.floor(Date.now() / 1000);
  }

  /**
   * 校验验证码是否有效
   * @param code 验证码
   * @param codeTicket jwt加密过的验证码
   */
  validateCode(code, codeTicket): boolean {
    try {
      const jwtParseResult = this.jwtService.verify(codeTicket) as { encryptCode: string; iat: number; exp: number };
      const encryptCode = this.md5Decode(code);
      if (encryptCode !== jwtParseResult.encryptCode) return false;
      if (this.nowSecondTimestamp() - jwtParseResult.iat >= this.config.codeTicketExpiresSecond) return false;
    } catch (error) {
      return false;
    }
    return true;
  }

  /**
   * md5加密
   * @param decodeStr 加密的字符串
   * @param secretKey 密钥 默认为config.md5Secret
   */
  md5Decode(decodeStr: string, secretKey = this.config.md5Secret) {
    const hash = crybto.createHash('md5');
    hash.update(decodeStr + secretKey);
    return hash.digest('base64');
  }

  /**
   * array to tree
   * @param list 扁平数据
   * @param parentIdField  父id字段 默认为 id
   * @param childIdField  子id字段 默认为 pid
   * @param childField  chidlren字段名 默认为 children
   */
  flatToNest<T, T2 = { chidlren: T }>(list: Array<T>, parentIdField = 'id', childIdField = 'pid', childField = 'children'): Array<Tree<T, T2>> {
    const res = [];
    const map: Object = {};
    const id = parentIdField;
    const pid = childIdField;
    const children = childField;

    for (const item of list) {
      map[id] = {
        ...item,
        [children]: map.hasOwnProperty(item[id]) ? map[item[id]] : [], // 如果pid先出现，但是map没有该pid的键值对
      };
      if (item[pid] === 0) {
        res.push(map[item[id]]);
      } else {
        if (!map.hasOwnProperty(item[pid])) {
          // 如果pid先出现，但是map没有该pid的键值对
          map[item[pid]] = {
            [children]: [],
          };
        }
        map[item[pid]][children].push(map[item[id]]);
      }
    }
    return res;
  }
}
