import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiResponse } from '../interface/api-response.interface';
import { BaseCustomException } from '../exceptions/custom-exceptions';
import { Prisma } from '@prisma/client';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/error-codes';
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
    if (
      exception instanceof Prisma.PrismaClientKnownRequestError ||
      exception instanceof Prisma.PrismaClientUnknownRequestError ||
      exception instanceof Prisma.PrismaClientValidationError
    ) {
      return this.handlePrisma(exception);
    }

    if (exception instanceof BaseCustomException) {
      return this.handleCustomException(exception);
    }

    if (exception instanceof HttpException) {
      return this.handleHttpException(exception);
    }

    return this.handleUnknownException(exception);
  }

  private handlePrisma(exception: unknown) {
    let status: number;
    let code: string;
    let message: string;

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          code = ERROR_CODES.CONFLICT;
          message = ERROR_MESSAGES[ERROR_CODES.CONFLICT];
          break;

        case 'P2003':
          status = HttpStatus.BAD_REQUEST;
          code = ERROR_CODES.BAD_REQUEST;
          message = '잘못된 참조 관계입니다';
          break;

        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          code = ERROR_CODES.NOT_FOUND;
          message = ERROR_MESSAGES[ERROR_CODES.NOT_FOUND];
          break;

        default:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          code = ERROR_CODES.DATABASE_ERROR;
          message = ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR];
          break;
      }
      return { status, code, message };
    }

    if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        code: ERROR_CODES.DATABASE_ERROR,
        message: ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
      };
    }

    if (exception instanceof Prisma.PrismaClientValidationError) {
      return {
        status: HttpStatus.BAD_REQUEST,
        code: ERROR_CODES.INVALID_INPUT,
        message: ERROR_MESSAGES[ERROR_CODES.INVALID_INPUT],
      };
    }

    return this.handleUnknownException(exception);
  }

  private handleCustomException(exception: BaseCustomException): { status: number; code: string; message: string } {
    const status = exception.getStatus();
    const response = exception.getResponse() as any;

    let code = response.errorCode || this.getDefaultErrorCode(status);
    let message = response.message || this.getDefaultMessage(status);

    return {
      status,
      code,
      message,
    };
  }

  private handleHttpException(exception: HttpException): { status: number; code: string; message: string } {
    const status = exception.getStatus();
    const response = exception.getResponse();

    let code: string;
    let message: string;

    if (status === HttpStatus.BAD_REQUEST && typeof response === 'object' && response !== null) {
      const responseObj = response as any;

      if (responseObj.message && Array.isArray(responseObj.message)) {
        code = ERROR_CODES.VALIDATION_FAILED;
        message = `입력값 검증 실패: ${responseObj.message.join(', ')}`;
        return { status, code, message };
      }

      if (responseObj.message && typeof responseObj.message === 'string') {
        code = ERROR_CODES.INVALID_INPUT;
        message = responseObj.message;
        return { status, code, message };
      }
    }

    code = this.getDefaultErrorCode(status);
    message = this.getDefaultMessage(status);

    return { status, code, message };
  }

  private handleUnknownException(exception: unknown): { status: number; code: string; message: string } {
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: ERROR_MESSAGES[ERROR_CODES.INTERNAL_SERVER_ERROR],
      message: ERROR_MESSAGES[ERROR_CODES.INTERNAL_SERVER_ERROR],
    };
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
      exception: exception,
    };

    // 5xx 에러는 error 레벨로, 4xx 에러는 warn 레벨로 로깅
    if (errorInfo.status >= 500) {
      this.logger.error(`Server Error: ${JSON.stringify(logContext)}`);
    } else if (errorInfo.status >= 400) {
      this.logger.warn(`Client Error: ${JSON.stringify(logContext)}`);
    }
  }

  private getDefaultErrorCode(status: number): string {
    const errorCodeMap: { [key: number]: string } = {
      400: ERROR_CODES.BAD_REQUEST, // E400001
      401: ERROR_CODES.UNAUTHORIZED, // E401001
      403: ERROR_CODES.FORBIDDEN, // E403001
      404: ERROR_CODES.NOT_FOUND, // E404001
      409: ERROR_CODES.CONFLICT, // E409001
      422: ERROR_CODES.UNPROCESSABLE_ENTITY, // E422001
      429: ERROR_CODES.RATE_LIMIT_EXCEEDED, // E429001
      500: ERROR_CODES.INTERNAL_SERVER_ERROR, // E500001
      502: ERROR_CODES.BAD_GATEWAY, // E502001
      503: ERROR_CODES.SERVICE_UNAVAILABLE, // E503001
      504: ERROR_CODES.GATEWAY_TIMEOUT, // E504001
    };

    return errorCodeMap[status] || ERROR_CODES.INTERNAL_SERVER_ERROR;
  }

  private getDefaultMessage(status: number): string {
    const messageMap: { [key: number]: string } = {
      400: ERROR_MESSAGES[ERROR_CODES.BAD_REQUEST],
      401: ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED],
      403: ERROR_MESSAGES[ERROR_CODES.FORBIDDEN],
      404: ERROR_MESSAGES[ERROR_CODES.NOT_FOUND],
      409: ERROR_MESSAGES[ERROR_CODES.CONFLICT],
      422: ERROR_MESSAGES[ERROR_CODES.UNPROCESSABLE_ENTITY],
      429: ERROR_MESSAGES[ERROR_CODES.RATE_LIMIT_EXCEEDED],
      500: ERROR_MESSAGES[ERROR_CODES.INTERNAL_SERVER_ERROR],
      502: ERROR_MESSAGES[ERROR_CODES.BAD_GATEWAY],
      503: ERROR_MESSAGES[ERROR_CODES.SERVICE_UNAVAILABLE],
      504: ERROR_MESSAGES[ERROR_CODES.GATEWAY_TIMEOUT],
    };

    return messageMap[status] || ERROR_MESSAGES[ERROR_CODES.INTERNAL_SERVER_ERROR];
  }
}
