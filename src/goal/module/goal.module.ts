import { Module } from '@nestjs/common';
import { GoalService } from '../service/goal.service';
import { GoalController } from '../controller/goal.controller';
import { AuthModule } from 'src/auth/module/auth.module';
import { PrismaService } from '../../prisma.service';
import { GoalRepository } from '../repository/goal.repository';

@Module({
  imports: [AuthModule],
  controllers: [GoalController],
  providers: [GoalService, PrismaService, GoalRepository],
  exports: [GoalService],
})
export class GoalModule {}
