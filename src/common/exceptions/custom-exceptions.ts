import { HttpException, HttpStatus } from '@nestjs/common';

export interface CustomErrorResponse {
  errorCode: string;
  message: string;
  statusCode: number;
  timestamp: string;
  details?: any;
}

/**
 * 기본 커스텀 예외 클래스
 * 모든 커스텀 예외는 이 클래스를 상속받아야 합니다.
 */
export class BaseCustomException extends HttpException {
  constructor(statusCode: HttpStatus, errorCode: string, message: string, details?: any) {
    const errorResponse: CustomErrorResponse = {
      statusCode,
      errorCode,
      message,
      timestamp: new Date().toISOString(),
      ...(details && { details }),
    };

    super(errorResponse, statusCode);
  }
}

// === 4xx Client Errors ===

/**
 * 400 Bad Request 예외들
 */
export class BadRequestException extends BaseCustomException {
  constructor(message: string = '잘못된 요청입니다', details?: any) {
    super(HttpStatus.BAD_REQUEST, 'E400001', message, details);
  }
}

export class ValidationException extends BaseCustomException {
  constructor(message: string = '입력값 검증에 실패했습니다', details?: any) {
    super(HttpStatus.BAD_REQUEST, 'E400002', message, details);
  }
}

export class InvalidInputException extends BaseCustomException {
  constructor(message: string = '유효하지 않은 입력값입니다', details?: any) {
    super(HttpStatus.BAD_REQUEST, 'E400003', message, details);
  }
}

/**
 * 401 Unauthorized 예외들
 */
export class UnauthorizedException extends BaseCustomException {
  constructor(message: string = '인증이 필요합니다') {
    super(HttpStatus.UNAUTHORIZED, 'E401001', message);
  }
}

export class InvalidTokenException extends BaseCustomException {
  constructor(message: string = '유효하지 않은 토큰입니다') {
    super(HttpStatus.UNAUTHORIZED, 'E401002', message);
  }
}

export class TokenExpiredException extends BaseCustomException {
  constructor(message: string = '토큰이 만료되었습니다') {
    super(HttpStatus.UNAUTHORIZED, 'E401003', message);
  }
}

export class LoginRequiredException extends BaseCustomException {
  constructor(message: string = '로그인이 필요합니다') {
    super(HttpStatus.UNAUTHORIZED, 'E401004', message);
  }
}

/**
 * 403 Forbidden 예외들
 */
export class ForbiddenException extends BaseCustomException {
  constructor(message: string = '접근 권한이 없습니다') {
    super(HttpStatus.FORBIDDEN, 'E403001', message);
  }
}

export class AccessDeniedException extends BaseCustomException {
  constructor(message: string = '접근이 거부되었습니다') {
    super(HttpStatus.FORBIDDEN, 'E403002', message);
  }
}

/**
 * 404 Not Found 예외들
 */
export class NotFoundException extends BaseCustomException {
  constructor(resource: string = '리소스', message?: string) {
    const defaultMessage = `${resource}를 찾을 수 없습니다`;
    super(HttpStatus.NOT_FOUND, 'E404001', message || defaultMessage);
  }
}

export class UserNotFoundException extends BaseCustomException {
  constructor(message: string = '사용자를 찾을 수 없습니다') {
    super(HttpStatus.NOT_FOUND, 'E404002', message);
  }
}

/**
 * 409 Conflict 예외들
 */
export class ConflictException extends BaseCustomException {
  constructor(message: string = '리소스 충돌이 발생했습니다') {
    super(HttpStatus.CONFLICT, 'E409001', message);
  }
}

export class DuplicateException extends BaseCustomException {
  constructor(resource: string = '데이터', message?: string) {
    const defaultMessage = `중복된 ${resource}입니다`;
    super(HttpStatus.CONFLICT, 'E409002', message || defaultMessage);
  }
}

// === 5xx Server Errors ===

/**
 * 500 Internal Server Error 예외들
 */
export class InternalServerException extends BaseCustomException {
  constructor(message: string = '내부 서버 오류가 발생했습니다', details?: any) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, 'E500001', message, details);
  }
}

export class DatabaseException extends BaseCustomException {
  constructor(message: string = '데이터베이스 오류가 발생했습니다', details?: any) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, 'E500002', message, details);
  }
}

export class ExternalServiceException extends BaseCustomException {
  constructor(service: string, message?: string) {
    const defaultMessage = `외부 서비스(${service}) 연동 중 오류가 발생했습니다`;
    super(HttpStatus.INTERNAL_SERVER_ERROR, 'E500003', message || defaultMessage);
  }
}

/**
 * 503 Service Unavailable 예외들
 */
export class ServiceUnavailableException extends BaseCustomException {
  constructor(message: string = '서비스를 일시적으로 사용할 수 없습니다') {
    super(HttpStatus.SERVICE_UNAVAILABLE, 'E503001', message);
  }
}
