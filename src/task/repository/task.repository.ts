import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TaskResponse } from '../dto/index';
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

  async createTask(data: Prisma.TaskCreateInput, authorId: string) {
    try {
      let task;

      console.log(data);
      await this.prisma.$transaction(async (tx) => {
        task = await tx.task.create({
          data,
          select: this.select,
        });

        await tx.memo.create({
          data: {
            task: { connect: { id: task.id } },
            author: { connect: { id: authorId } },
            content: '',
          },
        });
      });

      return task;
    } catch (error) {
      console.error(error);
      throw new Error('Task creation failed');
    }
  }

  async createManyTasks(data: Prisma.TaskCreateManyInput[], authorId: string) {
    let tasks: TaskResponse[] = [];

    await this.prisma.$transaction(async (tx) => {
      for (const d of data) {
        const task = await tx.task.create({ data: d, select: this.select });

        await tx.memo.create({
          data: {
            task: { connect: { id: task.id } },
            author: { connect: { id: authorId } },
            content: '',
          },
        });

        tasks.push(task);
      }
    });
    return tasks;
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
