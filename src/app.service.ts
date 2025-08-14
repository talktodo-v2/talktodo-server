import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'TalkTodo Server API is running!';
  }

  async getDatabaseStatus(): Promise<{ status: string; responseTime?: number }> {
    try {
      const startTime = Date.now();
      await this.prisma.$queryRaw`SELECT 1`;
      const responseTime = Date.now() - startTime;

      return {
        status: 'connected',
        responseTime,
      };
    } catch (error) {
      return {
        status: 'disconnected',
      };
    }
  }

  getSystemInfo() {
    return {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      pid: process.pid,
      cpuUsage: process.cpuUsage(),
    };
  }
}
