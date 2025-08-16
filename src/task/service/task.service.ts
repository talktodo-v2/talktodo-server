import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';

import { NotFoundException } from '../../common/exceptions/custom-exceptions';
import { toDayRange } from '../util/dayFomatter';
import { Priority, DayOfWeek } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async createTask(createInput: Input) {
    const { authorId, goalId, startDate, endDate, ...rest } = createInput;

    return this.taskRepository.createTask({
      ...rest,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      author: { connect: { id: authorId } },
      ...(goalId ? { goal: { connect: { id: goalId } } } : {}),
    });
  }

  async createManyTasks(createInputs: Input[]) {
    return this.taskRepository.createManyTasks(
      createInputs.map((createInput) => {
        const { authorId, goalId, startDate, endDate, ...rest } = createInput;
        return {
          ...rest,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          authorId,
          ...(goalId ? { goalId } : {}),
        };
      })
    );
  }

  async findManyTaskById(id: string, { startDate, goalId }: FindManyTasksQuery) {
    const { startOfDay, endOfDay } = toDayRange(startDate);

    return this.taskRepository.findManyTaskById(id, { startOfDay, endOfDay, goalId });
  }

  async findTaskById(id: string) {
    const task = await this.taskRepository.findTaskById(id);

    if (!task) throw new NotFoundException();

    return task;
  }

  async updateTaskById(id: string, updateInput: Input) {
    const { authorId, goalId, startDate, endDate, ...rest } = updateInput;

    return this.taskRepository.updateTaskById(id, {
      ...rest,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      author: { connect: { id: authorId } },
      ...(goalId ? { goal: { connect: { id: goalId } } } : {}),
    });
  }

  async deleteTaskById(id: string) {
    return this.taskRepository.deleteTaskById(id);
  }
}

interface Input {
  authorId: string;
  goalId?: string;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  priority: Priority;
  repeatDays?: DayOfWeek[];
}

export interface FindManyTasksQuery {
  startDate?: Date;
  goalId?: string;
}
