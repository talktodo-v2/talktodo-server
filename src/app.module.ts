import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/module/auth.module';
import { TaskModule } from './task/module/task.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AuthModule, TaskModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
