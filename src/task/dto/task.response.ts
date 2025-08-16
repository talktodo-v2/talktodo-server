import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { priorityEnToKo, dayEnToKo, DayOfWeek } from '../util/mapper';

export class TaskResponse {
  @ApiProperty({
    description: '할일 ID',
    example: 'c0073b08-9ab5-4dcf-b6d8-d8e6bcdb56cb',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: '할일 제목',
    example: '프로젝트 기획안 작성',
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: '할일 내용',
    example: '새로운 프로젝트의 기획안을 작성하고 팀에 공유한다.',
    nullable: true,
  })
  @Expose()
  content: string | null;

  @ApiProperty({
    description: '시작 날짜',
    example: '2025-01-15T09:00:00.000Z',
    type: Date,
  })
  @Expose()
  startDate: Date;

  @ApiProperty({
    description: '종료 날짜',
    example: '2025-01-15T10:00:00.000Z',
    type: Date,
  })
  @Expose()
  endDate: Date;

  @ApiProperty({
    description: '우선순위 (한국어)',
    enum: ['중요', '보통', '낮음'],
    example: '중요',
  })
  @Expose()
  @Transform(({ value }) => priorityEnToKo[value])
  priority: string;

  @ApiProperty({
    description: '반복 요일 (한국어)',
    type: [String],
    enum: ['월', '화', '수', '목', '금', '토', '일'],
    example: ['월', '수', '금'],
    isArray: true,
  })
  @Expose()
  @Transform(({ value }) => value.map((v: DayOfWeek) => dayEnToKo[v]))
  repeatDays: string[];

  @ApiProperty({
    description: '목표 ID',
    example: 'c0073b08-9ab5-4dcf-b6d8-d8e6bcdb56cb',
    nullable: true,
  })
  @Expose()
  goalId: string | null;

  @ApiProperty({
    description: '완료 상태',
    example: false,
  })
  @Expose()
  completed: boolean;
}

export class TaskListResponse extends Array<TaskResponse> {}

export class TaskBulkResponse {
  @ApiProperty({
    description: '생성된 할일의 개수',
    example: 5,
  })
  count: number;
}
