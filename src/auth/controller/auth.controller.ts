import { Controller, Get, Req, Res, UseGuards, UseInterceptors, HttpCode, HttpStatus, Post } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { ResponseInterceptor, ResponseCode, ResponseMessage } from '../../common/interceptor/response.interceptor';
import { LoginProvider } from '../types';
import { KakaoAuthGuard } from '../guards/kakao-auth.guard';
import { pickRedirectFromState } from '../util/pickRedirectFromState';
import { SUCCESS_CODES, SUCCESS_MESSAGES } from '../../common/constants/success-codes';

@UseInterceptors(ResponseInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.AUTH_KAKAO_START)
  @ResponseMessage(SUCCESS_MESSAGES[SUCCESS_CODES.AUTH_KAKAO_START])
  @UseGuards(KakaoAuthGuard)
  start() {}

  @Get('kakao/callback')
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.AUTH_KAKAO_CALLBACK)
  @ResponseMessage(SUCCESS_MESSAGES[SUCCESS_CODES.AUTH_KAKAO_CALLBACK])
  @UseGuards(KakaoAuthGuard)
  async callback(@Req() req: Request, @Res() res: Response) {
    const loginInput = req.user as {
      provider: LoginProvider;
      email: string;
      profileImage: string;
    };
    const { accessToken } = await this.authService.login(loginInput);

    const redirectUrl = pickRedirectFromState(req.query.state as string);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 12,
    });
    return res.redirect(redirectUrl);
  }

  @Get('temp')
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.AUTH_LOGOUT_SUCCESS)
  @ResponseMessage(SUCCESS_MESSAGES[SUCCESS_CODES.AUTH_LOGOUT_SUCCESS])
  async getToken(@Res({ passthrough: true }) res: Response) {
    const accessToken = await this.authService.generateToken({ id: 'c0073b08-9ab5-4dcf-b6d8-d8e6bcdb56cb' });

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 12,
    });

    return { accessToken };
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.AUTH_LOGOUT_SUCCESS)
  @ResponseMessage(SUCCESS_MESSAGES[SUCCESS_CODES.AUTH_LOGOUT_SUCCESS])
  logout(@Res({ passthrough: true }) res: Response) {
    // 쿠키 삭제
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return { isLoggedOut: true };
  }
}
