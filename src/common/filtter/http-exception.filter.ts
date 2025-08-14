// common/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiResponse } from '../interface/api-response.interface';
import { BaseCustomException } from '../exceptions/custom-exceptions';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorInfo = this.extractErrorInfo(exception);

    // 에러 로깅
    this.logError(errorInfo, request, exception);

    const errorResponse: ApiResponse<null> = {
      code: errorInfo.code,
      result: null,
      isSuccess: false,
      message: errorInfo.message,
    };

    response.status(errorInfo.status).json(errorResponse);
  }

  private extractErrorInfo(exception: unknown): { status: number; code: string; message: string } {
    if (exception instanceof BaseCustomException) {
      return this.handleCustomException(exception);
    }

    if (exception instanceof HttpException) {
      return this.handleHttpException(exception);
    }

    return this.handleUnknownException(exception);
  }

  private handleCustomException(exception: BaseCustomException): { status: number; code: string; message: string } {
    const status = exception.getStatus();
    const response = exception.getResponse() as any;

    return {
      status,
      code: response.errorCode || `E${status}000`,
      message: response.message || exception.message,
    };
  }

  private handleHttpException(exception: HttpException): { status: number; code: string; message: string } {
    const status = exception.getStatus();
    const response = exception.getResponse();

    let code: string;
    let message: string;

    if (typeof response === 'object' && response !== null) {
      const responseObj = response as any;
      code = responseObj.code || responseObj.errorCode || this.getDefaultErrorCode(status);
      message = responseObj.message || Array.isArray(responseObj.message) ? responseObj.message.join(', ') : exception.message;
    } else {
      code = this.getDefaultErrorCode(status);
      message = (response as string) || exception.message;
    }

    return { status, code, message };
  }

  private handleUnknownException(exception: unknown): { status: number; code: string; message: string } {
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string;
    if (exception instanceof Error) {
      message = exception.message;
    } else if (typeof exception === 'string') {
      message = exception;
    } else {
      message = 'Internal server error';
    }

    return {
      status,
      code: 'E500000',
      message,
    };
  }

  private getDefaultErrorCode(status: number): string {
    const errorCodeMap: { [key: number]: string } = {
      400: 'E400000', // Bad Request
      401: 'E401000', // Unauthorized
      403: 'E403000', // Forbidden
      404: 'E404000', // Not Found
      405: 'E405000', // Method Not Allowed
      409: 'E409000', // Conflict
      422: 'E422000', // Unprocessable Entity
      429: 'E429000', // Too Many Requests
      500: 'E500000', // Internal Server Error
      502: 'E502000', // Bad Gateway
      503: 'E503000', // Service Unavailable
    };

    return errorCodeMap[status] || `E${status}000`;
  }

  private logError(errorInfo: { status: number; code: string; message: string }, request: Request, exception: unknown) {
    const { method, url, ip, headers } = request;
    const userAgent = headers['user-agent'] || 'Unknown';

    const logContext = {
      timestamp: new Date().toISOString(),
      method,
      url,
      ip,
      userAgent,
      statusCode: errorInfo.status,
      errorCode: errorInfo.code,
      message: errorInfo.message,
    };

    // 5xx 에러는 error 레벨로, 4xx 에러는 warn 레벨로 로깅
    if (errorInfo.status >= 500) {
      this.logger.error(`Server Error: ${JSON.stringify(logContext)}`, exception instanceof Error ? exception.stack : undefined);
    } else if (errorInfo.status >= 400) {
      this.logger.warn(`Client Error: ${JSON.stringify(logContext)}`);
    }
  }
}
