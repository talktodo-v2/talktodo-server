import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';

// 메타데이터 키
export const RESPONSE_CODE_KEY = 'response_code';
export const RESPONSE_MESSAGE_KEY = 'response_message';

// 데코레이터
export const ResponseCode = (code: string) => SetMetadata(RESPONSE_CODE_KEY, code);
export const ResponseMessage = (message: string) => SetMetadata(RESPONSE_MESSAGE_KEY, message);

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const customCode = this.reflector.getAllAndOverride<string>(RESPONSE_CODE_KEY, [context.getHandler(), context.getClass()]);

        const customMessage = this.reflector.getAllAndOverride<string>(RESPONSE_MESSAGE_KEY, [context.getHandler(), context.getClass()]);

        const statusCode = response.statusCode;
        const isSuccess = statusCode >= 200 && statusCode < 300;

        return {
          isSuccess,
          code: customCode,
          message: customMessage,
          result: data ?? null,
        };
      })
    );
  }
}
