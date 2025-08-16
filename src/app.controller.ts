import { Controller, Get, UseInterceptors, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseInterceptor, ResponseCode, ResponseMessage } from './common/interceptor/response.interceptor';
import { SUCCESS_CODES } from './common/constants/success-codes';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('/')
@UseInterceptors(ResponseInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: '서버 상태 확인' })
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
