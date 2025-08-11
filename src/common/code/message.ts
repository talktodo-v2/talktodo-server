import { SUCCESS_CODES, ERROR_CODES } from './response';

// 성공 응답 메시지
export const SUCCESS_MESSAGES = {
  // 200 Success
  [SUCCESS_CODES.SUCCESS]: '요청이 성공했습니다.',
  [SUCCESS_CODES.DATA_RETRIEVED]: '데이터를 성공적으로 조회했습니다.',
  [SUCCESS_CODES.OPERATION_COMPLETED]: '작업이 완료되었습니다.',

  // 201 Created
  [SUCCESS_CODES.CREATED]: '리소스가 성공적으로 생성되었습니다.',
  [SUCCESS_CODES.USER_CREATED]: '사용자가 생성되었습니다.',
  [SUCCESS_CODES.TASK_CREATED]: '할일이 생성되었습니다.',
  [SUCCESS_CODES.GOAL_CREATED]: '목표가 생성되었습니다.',
  [SUCCESS_CODES.MEMO_CREATED]: '메모가 생성되었습니다.',

  // 인증 관련 성공
  [SUCCESS_CODES.LOGIN_SUCCESS]: '로그인이 완료되었습니다.',
  [SUCCESS_CODES.LOGOUT_SUCCESS]: '로그아웃이 완료되었습니다.',
  [SUCCESS_CODES.TOKEN_REFRESH_SUCCESS]: '토큰이 갱신되었습니다.',
  [SUCCESS_CODES.REGISTER_SUCCESS]: '회원가입이 완료되었습니다.',

  // 카카오 로그인 관련
  [SUCCESS_CODES.KAKAO_LOGIN_START]: '카카오 로그인을 시작합니다.',
  [SUCCESS_CODES.KAKAO_LOGIN_SUCCESS]: '카카오 로그인이 완료되었습니다.',
  [SUCCESS_CODES.KAKAO_REGISTER_REQUIRED]: '추가 정보 입력이 필요합니다.',

  // CRUD 작업 성공
  [SUCCESS_CODES.USER_UPDATED]: '사용자 정보가 수정되었습니다.',
  [SUCCESS_CODES.USER_DELETED]: '사용자가 삭제되었습니다.',
  [SUCCESS_CODES.TASK_UPDATED]: '할일이 수정되었습니다.',
  [SUCCESS_CODES.TASK_DELETED]: '할일이 삭제되었습니다.',
  [SUCCESS_CODES.GOAL_UPDATED]: '목표가 수정되었습니다.',
  [SUCCESS_CODES.GOAL_DELETED]: '목표가 삭제되었습니다.',
  [SUCCESS_CODES.MEMO_UPDATED]: '메모가 수정되었습니다.',
  [SUCCESS_CODES.MEMO_DELETED]: '메모가 삭제되었습니다.',

  // 조회 성공
  [SUCCESS_CODES.USER_LIST_SUCCESS]: '사용자 목록을 조회했습니다.',
  [SUCCESS_CODES.TASK_LIST_SUCCESS]: '할일 목록을 조회했습니다.',
  [SUCCESS_CODES.GOAL_LIST_SUCCESS]: '목표 목록을 조회했습니다.',
  [SUCCESS_CODES.MEMO_LIST_SUCCESS]: '메모 목록을 조회했습니다.',
  [SUCCESS_CODES.PROFILE_RETRIEVED]: '사용자 프로필을 조회했습니다.',
} as const;

// 에러 응답 메시지
export const ERROR_MESSAGES = {
  // 400 Bad Request
  [ERROR_CODES.BAD_REQUEST]: '잘못된 요청입니다.',
  [ERROR_CODES.INVALID_INPUT]: '잘못된 입력값입니다.',
  [ERROR_CODES.VALIDATION_FAILED]: '유효성 검사에 실패했습니다.',
  [ERROR_CODES.MISSING_REQUIRED_FIELD]: '필수 항목이 누락되었습니다.',
  [ERROR_CODES.INVALID_FORMAT]: '잘못된 형식입니다.',

  // 401 Unauthorized
  [ERROR_CODES.UNAUTHORIZED]: '인증이 필요합니다.',
  [ERROR_CODES.INVALID_TOKEN]: '유효하지 않은 토큰입니다.',
  [ERROR_CODES.TOKEN_EXPIRED]: '토큰이 만료되었습니다.',
  [ERROR_CODES.LOGIN_REQUIRED]: '로그인이 필요합니다.',
  [ERROR_CODES.INVALID_CREDENTIALS]: '잘못된 인증 정보입니다.',
  [ERROR_CODES.EMAIL_NOT_PROVIDED]: '이메일이 필요합니다.',

  // 403 Forbidden
  [ERROR_CODES.FORBIDDEN]: '접근 권한이 없습니다.',
  [ERROR_CODES.ACCESS_DENIED]: '접근이 거부되었습니다.',
  [ERROR_CODES.INSUFFICIENT_PERMISSIONS]: '권한이 부족합니다.',
  [ERROR_CODES.RESOURCE_FORBIDDEN]: '리소스에 접근할 수 없습니다.',

  // 404 Not Found
  [ERROR_CODES.NOT_FOUND]: '리소스를 찾을 수 없습니다.',
  [ERROR_CODES.USER_NOT_FOUND]: '사용자를 찾을 수 없습니다.',
  [ERROR_CODES.TASK_NOT_FOUND]: '할일을 찾을 수 없습니다.',
  [ERROR_CODES.GOAL_NOT_FOUND]: '목표를 찾을 수 없습니다.',
  [ERROR_CODES.MEMO_NOT_FOUND]: '메모를 찾을 수 없습니다.',
  [ERROR_CODES.RESOURCE_NOT_FOUND]: '요청한 리소스를 찾을 수 없습니다.',

  // 409 Conflict
  [ERROR_CODES.CONFLICT]: '리소스 충돌이 발생했습니다.',
  [ERROR_CODES.USER_ALREADY_EXISTS]: '이미 존재하는 사용자입니다.',
  [ERROR_CODES.EMAIL_ALREADY_EXISTS]: '이미 사용 중인 이메일입니다.',
  [ERROR_CODES.NICKNAME_ALREADY_EXISTS]: '이미 사용 중인 닉네임입니다.',
  [ERROR_CODES.DUPLICATE_RESOURCE]: '중복된 리소스입니다.',

  // 422 Unprocessable Entity
  [ERROR_CODES.UNPROCESSABLE_ENTITY]: '처리할 수 없는 요청입니다.',
  [ERROR_CODES.INVALID_DATA]: '유효하지 않은 데이터입니다.',
  [ERROR_CODES.BUSINESS_LOGIC_ERROR]: '비즈니스 로직 오류입니다.',

  // 429 Too Many Requests
  [ERROR_CODES.TOO_MANY_REQUESTS]: '너무 많은 요청입니다.',
  [ERROR_CODES.RATE_LIMIT_EXCEEDED]: '요청 한도를 초과했습니다.',

  // 500 Internal Server Error
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: '서버 내부 오류가 발생했습니다.',
  [ERROR_CODES.DATABASE_ERROR]: '데이터베이스 오류입니다.',
  [ERROR_CODES.EXTERNAL_SERVICE_ERROR]: '외부 서비스 오류입니다.',
  [ERROR_CODES.UNEXPECTED_ERROR]: '예상치 못한 오류가 발생했습니다.',

  // 502 Bad Gateway
  [ERROR_CODES.BAD_GATEWAY]: '게이트웨이 오류입니다.',
  [ERROR_CODES.UPSTREAM_SERVICE_ERROR]: '상위 서비스 오류입니다.',

  // 503 Service Unavailable
  [ERROR_CODES.SERVICE_UNAVAILABLE]: '서비스를 사용할 수 없습니다.',
  [ERROR_CODES.MAINTENANCE_MODE]: '서비스 점검 중입니다.',
} as const;

// 모든 응답 메시지 통합
export const RESPONSE_MESSAGES = {
  ...SUCCESS_MESSAGES,
  ...ERROR_MESSAGES,
} as const;

// 메시지 조회 헬퍼 함수
export const getResponseMessage = (code: ResponseCode): string => {
  return RESPONSE_MESSAGES[code] || '알 수 없는 응답입니다.';
};

export type ResponseCode = [keyof typeof RESPONSE_MESSAGES][number];
export type ResponseMessage = (typeof RESPONSE_MESSAGES)[keyof typeof RESPONSE_MESSAGES];
