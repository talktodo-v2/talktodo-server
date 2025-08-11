// auth.controller.ts
import { Controller, Get, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { ResponseInterceptor, ResponseCode, ResponseMessage } from '../../common/interceptor/response.interceptor';
import { getResponseMessage } from '../../common/code/index';
import { LoginProvider } from '../types';
import { KakaoAuthGuard } from '../guards/kakao-auth.guard';
import { pickRedirectFromState } from '../util/pickRedirectFromState';
@UseInterceptors(ResponseInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @ResponseCode('S200010')
  @ResponseMessage(getResponseMessage('S200010'))
  @UseGuards(KakaoAuthGuard)
  start() {}

  @Get('kakao/callback')
  @ResponseCode('S200021')
  @ResponseMessage(getResponseMessage('S200021'))
  @UseGuards(KakaoAuthGuard)
  async callback(@Req() req: Request, @Res() res: Response) {
    const loginInput = req.user as {
      provider: LoginProvider;
      email: string;
      profileImage: string;
    };
    const { accessToken } = await this.authService.login(loginInput);

    const redirectUrl = pickRedirectFromState(req.query.state as string);

    // 쿠키로 내려주기, 임시 개발, 차후 분리
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 12, // 12시간
    });
    return res.redirect(redirectUrl);
  }
}
