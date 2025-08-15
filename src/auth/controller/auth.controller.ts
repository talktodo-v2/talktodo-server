import { Controller, Get, Req, Res, UseGuards, UseInterceptors, HttpCode, HttpStatus, Post } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { ResponseInterceptor, ResponseCode, ResponseMessage } from '../../common/interceptor/response.interceptor';
import { LoginProvider } from '../types';
import { KakaoAuthGuard } from '../guards/kakao-auth.guard';
import { pickRedirectFromState } from '../util/pickRedirectFromState';
import { SUCCESS_CODES, SUCCESS_MESSAGES } from '../../common/constants/success-codes';
import { ApiExcludeEndpoint, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('/auth')
@UseInterceptors(ResponseInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @ApiOperation({ summary: '카카오 로그인 시작' })
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.AUTH_KAKAO_START)
  @ResponseMessage(SUCCESS_MESSAGES[SUCCESS_CODES.AUTH_KAKAO_START])
  @UseGuards(KakaoAuthGuard)
  start() {}

  @ApiExcludeEndpoint()
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
      path: '/',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 12,
    });
    return res.redirect(redirectUrl);
  }

  @ApiOperation({ summary: ' 스웨거 문서 테스팅을 위한 임시 토큰 발급 API 입니다.' })
  @Get('temp')
  @HttpCode(HttpStatus.NO_CONTENT)
  async getToken(@Res() res: Response) {
    if (!process.env.MOCK_USER_ID) {
      return res.status(HttpStatus.UNAUTHORIZED).end();
    }
    const accessToken = await this.authService.generateToken({ id: process.env.MOCK_USER_ID });

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 12,
    });

    res.end();
  }

  @ApiOperation({ summary: '로그 아웃' })
  @Get('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Res() res: Response) {
    // 쿠키 삭제
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    res.end();
  }
}
