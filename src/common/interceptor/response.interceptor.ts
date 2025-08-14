import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
import { ApiResponse } from '../interface/api-response.interface';

// 메타데이터 키
export const RESPONSE_CODE_KEY = 'response_code';
export const RESPONSE_MESSAGE_KEY = 'response_message';

// 데코레이터
export const ResponseCode = (code: string) => SetMetadata(RESPONSE_CODE_KEY, code);
export const ResponseMessage = (message: string) => SetMetadata(RESPONSE_MESSAGE_KEY, message);

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();

        const customCode =
          this.reflector.getAllAndOverride<string>(RESPONSE_CODE_KEY, [context.getHandler(), context.getClass()]) || 'S200000';

        const customMessage =
          this.reflector.getAllAndOverride<string>(RESPONSE_MESSAGE_KEY, [context.getHandler(), context.getClass()]) || 'Success';

        const statusCode = response.statusCode;
        const isSuccess = statusCode >= 200 && statusCode < 300;

        return {
          code: customCode,
          result: data ?? null,
          isSuccess,
          message: customMessage,
        };
      })
    );
  }
}
