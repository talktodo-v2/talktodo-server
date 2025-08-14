import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 현재 로그인한 사용자 정보를 가져오는 데코레이터
 * JWT Guard에서 검증된 사용자 정보를 반환합니다.
 */
export const CurrentUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  // 특정 필드만 반환하고 싶을 때
  return data ? user?.[data] : user;
});

/**
 * 쿠키에서 토큰을 직접 가져오는 데코레이터
 */
export const Token = createParamDecorator((tokenName: string = 'access_token', ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.cookies[tokenName];
});

/**
 * 사용자 ID만 가져오는 데코레이터 (편의용)
 */
export const UserId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user?.id;
});

/**
 * 사용자 이메일만 가져오는 데코레이터 (편의용)
 */
export const UserEmail = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user?.email;
});
