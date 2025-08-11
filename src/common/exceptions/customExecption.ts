import { ERROR_CODES } from '../code/response';
import { getResponseMessage } from '../code/message';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(statusCode: HttpStatus, message: string, errorCode: string) {
    super(
      {
        statusCode: statusCode,
        errorCode,
        message,
        timestamp: new Date().toISOString(),
      },
      statusCode
    );
  }
}

// 400 Bad Request 예외들
export class BadRequestException extends CustomException {
  constructor() {
    super(HttpStatus.BAD_REQUEST, getResponseMessage('E400001'), 'E400001');
  }
}

export class ValidationException extends CustomException {
  constructor() {
    super(HttpStatus.BAD_REQUEST, getResponseMessage(ERROR_CODES.VALIDATION_FAILED), ERROR_CODES.VALIDATION_FAILED);
  }
}

export class InvalidInputException extends CustomException {
  constructor() {
    super(HttpStatus.BAD_REQUEST, getResponseMessage(ERROR_CODES.INVALID_INPUT), ERROR_CODES.INVALID_INPUT);
  }
}

// 401 Unauthorized 예외들
export class UnauthorizedException extends CustomException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, getResponseMessage(ERROR_CODES.UNAUTHORIZED), ERROR_CODES.UNAUTHORIZED);
  }
}

export class InvalidTokenException extends CustomException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, getResponseMessage(ERROR_CODES.INVALID_TOKEN), ERROR_CODES.INVALID_TOKEN);
  }
}

export class TokenExpiredException extends CustomException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, getResponseMessage(ERROR_CODES.TOKEN_EXPIRED), ERROR_CODES.TOKEN_EXPIRED);
  }
}

export class LoginRequiredException extends CustomException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, getResponseMessage(ERROR_CODES.LOGIN_REQUIRED), ERROR_CODES.LOGIN_REQUIRED);
  }
}

export class EmailRequiredException extends CustomException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, getResponseMessage(ERROR_CODES.EMAIL_NOT_PROVIDED), ERROR_CODES.EMAIL_NOT_PROVIDED);
  }
}

// 403 Forbidden 예외들
export class ForbiddenException extends CustomException {
  constructor() {
    super(HttpStatus.FORBIDDEN, getResponseMessage(ERROR_CODES.FORBIDDEN), ERROR_CODES.FORBIDDEN);
  }
}

export class AccessDeniedException extends CustomException {
  constructor() {
    super(HttpStatus.FORBIDDEN, getResponseMessage(ERROR_CODES.ACCESS_DENIED), ERROR_CODES.ACCESS_DENIED);
  }
}

// 404 Not Found 예외들
export class NotFoundException extends CustomException {
  constructor() {
    super(HttpStatus.NOT_FOUND, getResponseMessage(ERROR_CODES.NOT_FOUND), ERROR_CODES.NOT_FOUND);
  }
}

export class UserNotFoundException extends CustomException {
  constructor() {
    super(HttpStatus.NOT_FOUND, getResponseMessage(ERROR_CODES.USER_NOT_FOUND), ERROR_CODES.USER_NOT_FOUND);
  }
}

export class TaskNotFoundException extends CustomException {
  constructor() {
    super(HttpStatus.NOT_FOUND, getResponseMessage(ERROR_CODES.TASK_NOT_FOUND), ERROR_CODES.TASK_NOT_FOUND);
  }
}

export class GoalNotFoundException extends CustomException {
  constructor() {
    super(HttpStatus.NOT_FOUND, getResponseMessage(ERROR_CODES.GOAL_NOT_FOUND), ERROR_CODES.GOAL_NOT_FOUND);
  }
}

export class MemoNotFoundException extends CustomException {
  constructor() {
    super(HttpStatus.NOT_FOUND, getResponseMessage(ERROR_CODES.MEMO_NOT_FOUND), ERROR_CODES.MEMO_NOT_FOUND);
  }
}

// 409 Conflict 예외들
export class ConflictException extends CustomException {
  constructor() {
    super(HttpStatus.CONFLICT, getResponseMessage(ERROR_CODES.CONFLICT), ERROR_CODES.CONFLICT);
  }
}

export class UserAlreadyExistsException extends CustomException {
  constructor() {
    super(HttpStatus.CONFLICT, getResponseMessage(ERROR_CODES.USER_ALREADY_EXISTS), ERROR_CODES.USER_ALREADY_EXISTS);
  }
}

export class EmailAlreadyExistsException extends CustomException {
  constructor() {
    super(HttpStatus.CONFLICT, getResponseMessage(ERROR_CODES.EMAIL_ALREADY_EXISTS), ERROR_CODES.EMAIL_ALREADY_EXISTS);
  }
}

export class NicknameAlreadyExistsException extends CustomException {
  constructor() {
    super(HttpStatus.CONFLICT, getResponseMessage(ERROR_CODES.NICKNAME_ALREADY_EXISTS), ERROR_CODES.NICKNAME_ALREADY_EXISTS);
  }
}

// 500 Internal Server Error 예외들
export class InternalServerErrorException extends CustomException {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, getResponseMessage(ERROR_CODES.INTERNAL_SERVER_ERROR), ERROR_CODES.INTERNAL_SERVER_ERROR);
  }
}

export class DatabaseException extends CustomException {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, getResponseMessage(ERROR_CODES.DATABASE_ERROR), ERROR_CODES.DATABASE_ERROR);
  }
}

export class ExternalServiceException extends CustomException {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, getResponseMessage(ERROR_CODES.EXTERNAL_SERVICE_ERROR), ERROR_CODES.EXTERNAL_SERVICE_ERROR);
  }
}

// 503 Service Unavailable 예외들
export class ServiceUnavailableException extends CustomException {
  constructor() {
    super(HttpStatus.SERVICE_UNAVAILABLE, getResponseMessage(ERROR_CODES.SERVICE_UNAVAILABLE), ERROR_CODES.SERVICE_UNAVAILABLE);
  }
}

export class MaintenanceModeException extends CustomException {
  constructor() {
    super(HttpStatus.SERVICE_UNAVAILABLE, getResponseMessage(ERROR_CODES.MAINTENANCE_MODE), ERROR_CODES.MAINTENANCE_MODE);
  }
}
