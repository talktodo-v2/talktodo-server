import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

/**
 * 인증이 필요한 엔드포인트에 적용하는 데코레이터
 * JWT 토큰 검증을 자동으로 수행합니다.
 */
export function Auth() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}

/**
 * 선택적 인증 데코레이터 (토큰이 있으면 검증, 없어도 통과)
 * TODO: OptionalJwtAuthGuard 구현 필요
 */
export function OptionalAuth() {
  return applyDecorators();
  // UseGuards(OptionalJwtAuthGuard),
}
