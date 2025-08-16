import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGoalRequest {
  @ApiProperty({
    description: '골 내용',
    example: '톡투두 서버 개발',
  })
  @Length(1, 32)
  content: string;
}

export class UpdateGoalRequest extends CreateGoalRequest {}
