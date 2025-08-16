import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MemoRepository {
  private readonly select: Prisma.MemoSelect = {
    taskId: true,
    content: true,
  };

  constructor(private prisma: PrismaService) {}

  async updateMemoByTaskId(taskId: string, data: Prisma.MemoCreateInput) {
    return this.prisma.memo.update({
      where: { taskId },
      data,
      select: this.select,
    });
  }

  async getMemoByTaskId(taskId: string) {
    return this.prisma.memo.findFirst({
      where: { taskId },
      select: this.select,
    });
  }
}
