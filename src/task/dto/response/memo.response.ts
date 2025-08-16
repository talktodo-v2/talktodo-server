import { ApiProperty } from '@nestjs/swagger';

export class MemoResponse {
  @ApiProperty({
    description: '할 일 ID',
    example: 'c0073b08-9ab5-4dcf-b6d8-d8e6bcdb56cb',
  })
  taskId: string;

  @ApiProperty({
    description: '메모 내용',
    example: '회의록 작성',
  })
  content: string;
}
