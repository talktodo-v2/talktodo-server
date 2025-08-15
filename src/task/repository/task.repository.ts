import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskRepository {
  private readonly select: Prisma.TaskSelect = {
    id: true,
    title: true,
    content: true,
    startDate: true,
    endDate: true,
    priority: true,
    repeatDays: true,
    goalId: true,
    completed: true,
  };

  constructor(private prisma: PrismaService) {}

  async createTask(data: Prisma.TaskCreateInput) {
    return this.prisma.task.create({
      data,
      select: this.select,
    });
  }

  async createManyTasks(data: Prisma.TaskCreateManyInput[]) {
    return this.prisma.task.createMany({ data });
  }

  async findTaskById(id: string) {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
      select: this.select,
    });
  }

  async findManyTaskById(id: string, { startOfDay, endOfDay, goalId }: { startOfDay?: Date; endOfDay?: Date; goalId?: string }) {
    const overlap =
      startOfDay && endOfDay
        ? {
            startDate: { lte: endOfDay },
            endDate: { gte: startOfDay },
          }
        : {};

    return this.prisma.task.findMany({
      where: {
        authorId: id,
        ...overlap,
        ...(goalId && { goalId }),
      },
      select: this.select,
    });
  }

  async updateTaskById(id: string, data: Prisma.TaskUpdateInput) {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTaskById(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
