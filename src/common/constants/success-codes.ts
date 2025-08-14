/**
 * 성공 응답 코드 상수 정의
 * 형식: S{HTTP상태코드}{순번}
 */
export const SUCCESS_CODES = {
  // 200 OK - 일반 성공
  SUCCESS: 'S200001',
  DATA_RETRIEVED: 'S200002',
  OPERATION_COMPLETED: 'S200003',

  // 200 OK - 인증 관련
  AUTH_KAKAO_START: 'S200010',
  AUTH_KAKAO_CALLBACK: 'S200021',
  AUTH_LOGIN_SUCCESS: 'S200022',
  AUTH_LOGOUT_SUCCESS: 'S200023',
  AUTH_TOKEN_REFRESH: 'S200024',

  // 201 Created
  CREATED: 'S201001',
  USER_CREATED: 'S201002',
  RESOURCE_CREATED: 'S201003',

  // 202 Accepted
  ACCEPTED: 'S202001',
  PROCESSING: 'S202002',

  // 204 No Content
  NO_CONTENT: 'S204001',
  DELETED: 'S204002',
} as const;

/**
 * 성공 메시지 상수
 */
export const SUCCESS_MESSAGES = {
  [SUCCESS_CODES.SUCCESS]: '요청이 성공적으로 처리되었습니다',
  [SUCCESS_CODES.DATA_RETRIEVED]: '데이터를 성공적으로 조회했습니다',
  [SUCCESS_CODES.OPERATION_COMPLETED]: '작업이 성공적으로 완료되었습니다',

  [SUCCESS_CODES.AUTH_KAKAO_START]: '카카오 로그인 페이지로 이동합니다',
  [SUCCESS_CODES.AUTH_KAKAO_CALLBACK]: '카카오 로그인이 완료되었습니다',
  [SUCCESS_CODES.AUTH_LOGIN_SUCCESS]: '로그인이 성공적으로 완료되었습니다',
  [SUCCESS_CODES.AUTH_LOGOUT_SUCCESS]: '로그아웃이 완료되었습니다',
  [SUCCESS_CODES.AUTH_TOKEN_REFRESH]: '토큰이 성공적으로 갱신되었습니다',

  [SUCCESS_CODES.CREATED]: '리소스가 성공적으로 생성되었습니다',
  [SUCCESS_CODES.USER_CREATED]: '사용자가 성공적으로 생성되었습니다',
  [SUCCESS_CODES.RESOURCE_CREATED]: '리소스가 성공적으로 생성되었습니다',

  [SUCCESS_CODES.ACCEPTED]: '요청이 접수되었습니다',
  [SUCCESS_CODES.PROCESSING]: '요청을 처리하고 있습니다',

  [SUCCESS_CODES.NO_CONTENT]: '요청이 성공적으로 처리되었습니다',
  [SUCCESS_CODES.DELETED]: '리소스가 성공적으로 삭제되었습니다',
} as const;

export type SuccessCode = (typeof SUCCESS_CODES)[keyof typeof SUCCESS_CODES];
