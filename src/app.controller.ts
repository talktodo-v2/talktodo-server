import { Controller, Get, UseInterceptors, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseInterceptor, ResponseCode, ResponseMessage } from './common/interceptor/response.interceptor';
import { SUCCESS_CODES, SUCCESS_MESSAGES } from './common/constants/success-codes';

@UseInterceptors(ResponseInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.SUCCESS)
  @ResponseMessage('서버가 정상적으로 실행중입니다')
  getHello() {
    return {
      message: this.appService.getHello(),
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    };
  }

  @Get('health')
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.SUCCESS)
  @ResponseMessage('서버 상태가 정상입니다')
  async healthCheck() {
    const uptime = process.uptime();
    const memory = process.memoryUsage();
    const databaseStatus = await this.appService.getDatabaseStatus();
    const systemInfo = this.appService.getSystemInfo();

    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: {
        seconds: Math.floor(uptime),
        formatted: this.formatUptime(uptime),
      },
      memory: {
        used: Math.round((memory.heapUsed / 1024 / 1024) * 100) / 100, // MB
        total: Math.round((memory.heapTotal / 1024 / 1024) * 100) / 100, // MB
        external: Math.round((memory.external / 1024 / 1024) * 100) / 100, // MB
        rss: Math.round((memory.rss / 1024 / 1024) * 100) / 100, // MB
      },
      database: databaseStatus,
      system: {
        platform: systemInfo.platform,
        arch: systemInfo.arch,
        nodeVersion: systemInfo.nodeVersion,
        pid: systemInfo.pid,
      },
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      services: {
        authentication: 'available',
        api: 'available',
        database: databaseStatus.status === 'connected' ? 'available' : 'unavailable',
      },
    };
  }

  @Get('health/simple')
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.SUCCESS)
  @ResponseMessage('OK')
  simpleHealthCheck() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('health/database')
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.SUCCESS)
  @ResponseMessage('데이터베이스 상태를 확인했습니다')
  async databaseHealthCheck() {
    const databaseStatus = await this.appService.getDatabaseStatus();

    return {
      database: databaseStatus,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('health/detailed')
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.SUCCESS)
  @ResponseMessage('상세한 서버 상태를 확인했습니다')
  async detailedHealthCheck() {
    const uptime = process.uptime();
    const memory = process.memoryUsage();
    const databaseStatus = await this.appService.getDatabaseStatus();
    const systemInfo = this.appService.getSystemInfo();

    return {
      server: {
        status: 'healthy',
        uptime: {
          seconds: Math.floor(uptime),
          formatted: this.formatUptime(uptime),
          startTime: new Date(Date.now() - uptime * 1000).toISOString(),
        },
        memory: {
          used: Math.round((memory.heapUsed / 1024 / 1024) * 100) / 100,
          total: Math.round((memory.heapTotal / 1024 / 1024) * 100) / 100,
          external: Math.round((memory.external / 1024 / 1024) * 100) / 100,
          rss: Math.round((memory.rss / 1024 / 1024) * 100) / 100,
          arrayBuffers: Math.round((memory.arrayBuffers / 1024 / 1024) * 100) / 100,
        },
        cpu: {
          usage: systemInfo.cpuUsage,
        },
      },
      database: databaseStatus,
      system: systemInfo,
      application: {
        name: 'TalkTodo Server',
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 3001,
      },
      timestamp: new Date().toISOString(),
    };
  }

  private formatUptime(uptime: number): string {
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  }
}
