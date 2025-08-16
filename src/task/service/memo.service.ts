import { Injectable } from '@nestjs/common';
import { MemoRepository } from '../repository/memo.respository';

@Injectable()
export class MemoService {
  constructor(private memoRepository: MemoRepository) {}

  async updateMemoByTaskId(authorId: string, taskId: string, createInput: Input) {
    const { content } = createInput;

    return this.memoRepository.updateMemoByTaskId(taskId, {
      content,
      author: {
        connect: {
          id: authorId,
        },
      },
      task: {
        connect: {
          id: taskId,
        },
      },
    });
  }

  async getMemoByTaskId(taskId: string) {
    return this.memoRepository.getMemoByTaskId(taskId);
  }
}

interface Input {
  content: string;
}
