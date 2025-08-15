import { Module } from '@nestjs/common';
import { TaskController } from '../controller/task.controller';
import { TaskService } from '../service/task.service';
import { TaskRepository } from '../repository/task.repository';
import { PrismaService } from '../../prisma.service';
import { AuthModule } from '../../auth/module/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, PrismaService],
  exports: [TaskService],
})
export class TaskModule {}
