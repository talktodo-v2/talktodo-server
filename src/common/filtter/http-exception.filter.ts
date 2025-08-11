// common/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse() as string | { message?: string; errorCode?: string };

    res.status(status).json({
      isSuccess: false,
      code: (errorResponse as any).errorCode || 'ERROR',
      message: typeof errorResponse === 'string' ? errorResponse : (errorResponse as any).message || null,
      result: null,
    });
  }
}
