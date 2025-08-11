// src/auth/guards/kakao-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class KakaoAuthGuard extends AuthGuard('kakao') {
  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const callbackUrl = (req.query?.callbackUrl as string) || 'http://localhost:3000/';

    return {
      scope: ['account_email', 'profile_image'],
      state: encodeURIComponent(callbackUrl),
    };
  }
}
