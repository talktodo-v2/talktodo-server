import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/module/auth.module';
import { TaskModule } from './task/module/task.module';
import { PrismaService } from './prisma.service';
import { GoalModule } from './goal/module/goal.module';
import { MemoModule } from './memo/memo.module';

@Module({
  imports: [AuthModule, TaskModule, GoalModule, MemoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
