import { Injectable, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GoalRepository {
  private readonly select: Prisma.GoalSelect = {
    id: true,
    content: true,
  };

  constructor(private prisma: PrismaService) {}

  async createGoal(data: Prisma.GoalCreateInput) {
    return this.prisma.goal.create({ data });
  }

  async findGoal(id: string, authorId: string) {
    const goal = await this.prisma.goal.findUniqueOrThrow({
      where: { id: id, AND: { author: { id: authorId } } },
      select: this.select,
    });

    const taskCounts = await this.groupByGoal(id);

    const result = {
      ...goal,
      taskCount: taskCounts,
    };

    return result;
  }

  async findAllGoal(authorId: string) {
    const goals = await this.prisma.goal.findMany({
      where: {
        authorId,
      },
      select: this.select,
    });

    const countsPromises = goals.map((g) => this.groupByGoal(g.id));
    const counts = await Promise.all(countsPromises);

    const result = goals.map((goal, index) => ({
      ...goal,
      taskCount: counts[index],
    }));

    return result;
  }

  async updateGoal(id: string, data: Prisma.GoalUpdateInput) {
    return this.prisma.goal.update({
      where: { id: id },
      data,
    });
  }

  async deleteGoal(id: string) {
    return this.prisma.goal.delete({
      where: { id: id },
    });
  }

  async groupByGoal(goalId: string) {
    const grouped = await this.prisma.task.groupBy({
      by: ['goalId', 'completed'],
      where: { goalId: goalId },
      _count: { _all: true },
    });

    const countsMap = new Map<string | null, { completed: number; uncompleted: number; total: number }>();
    for (const r of grouped) {
      if (!r.goalId) continue;
      const cur = countsMap.get(r.goalId) ?? { completed: 0, uncompleted: 0, total: 0 };
      if (r.completed) cur.completed += r._count._all;
      else cur.uncompleted += r._count._all;
      cur.total += r._count._all;
      countsMap.set(r.goalId, cur);
    }
    return countsMap.get(goalId) ?? { completed: 0, uncompleted: 0, total: 0 };
  }
}
