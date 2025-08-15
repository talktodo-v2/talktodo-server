import { Controller, Get, UseInterceptors, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseInterceptor, ResponseCode, ResponseMessage } from './common/interceptor/response.interceptor';
import { SUCCESS_CODES, SUCCESS_MESSAGES } from './common/constants/success-codes';

@UseInterceptors(ResponseInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.SUCCESS)
  @ResponseMessage('서버가 정상적으로 실행중입니다')
  getHealth() {
    return {
      message: this.appService.getHello(),
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
