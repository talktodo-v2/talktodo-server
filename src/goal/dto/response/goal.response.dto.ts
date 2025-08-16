import { ApiProperty } from '@nestjs/swagger';

export class GoalResponse {
  @ApiProperty({
    description: '목표 ID',
    example: 'c0073b08-9ab5-4dcf-b6d8-d8e6bcdb56cb',
  })
  id: string;

  @ApiProperty({
    description: '목표 내용',
    example: '톡투두 서버 개발',
  })
  content: string;
}

export class GetGoalResponse extends GoalResponse {
  @ApiProperty({
    description: '할일 개수',
    example: {
      completed: 0,
      uncompleted: 6,
      total: 6,
    },
  })
  taskCount: {
    completed: number;
    uncompleted: number;
    total: number;
  };
}
