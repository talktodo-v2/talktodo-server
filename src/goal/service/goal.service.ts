import { Injectable } from '@nestjs/common';
import { GoalRepository } from '../repository/goal.repository';

@Injectable()
export class GoalService {
  constructor(private readonly goalRepository: GoalRepository) {}

  async findAll(authorId: string) {
    return await this.goalRepository.findAllGoal(authorId);
  }

  async createGoal(createInput: Input) {
    const { authorId, ...rest } = createInput;
    return await this.goalRepository.createGoal({ ...rest, author: { connect: { id: authorId } } });
  }

  async findOne(id: string, authorId: string) {
    return await this.goalRepository.findGoal(id, authorId);
  }

  async updateGoal(id: string, updateInput: Input) {
    const { authorId, ...rest } = updateInput;
    return await this.goalRepository.updateGoal(id, { author: { ...rest, connect: { id: authorId } } });
  }

  async deleteGoal(id: string) {
    return await this.goalRepository.deleteGoal(id);
  }
}

interface Input {
  authorId: string;
  content: string;
}
