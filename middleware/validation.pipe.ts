import { ArgumentMetadata, HttpException, Inject, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import Config from 'config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  constructor(
    @Inject(Config.KEY)
    private readonly config: ConfigType<typeof Config>,
  ) {}
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorMessave = Object.values(errors[0].constraints)[0];
      throw new HttpException(errorMessave, this.config.badRequestStatus);
    }
    return value;
  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
