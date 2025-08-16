import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class MemoRequest {
  @ApiProperty({
    description: '메모 내용',
    minLength: 1,
    maxLength: 1000,
    example: '회의록 작성',
  })
  @Length(1, 1000)
  content: string;
}
