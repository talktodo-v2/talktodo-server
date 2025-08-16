import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Length, IsDateString, IsArray, IsOptional, IsUUID, IsDate, IsEnum, IsBoolean, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { priorityKoToEn, dayKoToEn, DayOfWeek, Priority } from '../../util/mapper';

export class CreateTaskRequest {
  @ApiProperty({
    description: '할일 제목',
    minLength: 1,
    maxLength: 32,
    example: '프로젝트 기획안 작성',
  })
  @Length(1, 32)
  title: string;

  @ApiProperty({
    description: '할일 내용',
    minLength: 1,
    maxLength: 1000,
    example: '새로운 프로젝트의 기획안을 작성하고 팀에 공유한다.',
  })
  @Length(1, 1000)
  content: string;

  @ApiProperty({
    description: '시작 날짜 (ISO 8601 형식)',
    example: '2025-01-15T09:00:00.000Z',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: '종료 날짜 (ISO 8601 형식)',
    example: '2025-01-15T10:00:00.000Z',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: '우선순위',
    enum: ['중요', '보통', '낮음'],
    example: '중요',
  })
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;
    const v = value.trim();
    return priorityKoToEn[v] ?? value;
  })
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty({
    description: '반복 요일',
    type: [String],
    enum: ['월', '화', '수', '목', '금', '토', '일'],
    example: ['월', '수', '금'],
    isArray: true,
  })
  @Transform(({ value }) => {
    if (!Array.isArray(value)) return value;
    return value.map((v) => dayKoToEn[String(v).trim()] ?? v);
  })
  @IsArray()
  @IsEnum(DayOfWeek, { each: true })
  repeatDays: DayOfWeek[];

  @ApiPropertyOptional({
    description: '할 일 완료 여부',
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @ApiPropertyOptional({
    description: '목표 ID (UUID)',
  })
  @IsUUID()
  @IsOptional()
  goalId?: string;
}

export class GetTaskQuery {
  @ApiPropertyOptional({
    description: '시작 날짜 (ISO 8601 형식)',
    example: '2025-01-15',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({
    description: '목표 ID (UUID)',
  })
  @IsOptional()
  goalId?: string;
}

export class CreateTaskListRequest {
  @ApiProperty({ type: [CreateTaskRequest] })
  @ValidateNested({ each: true })
  @Type(() => CreateTaskRequest)
  items: CreateTaskRequest[];
}

export class UpdateTaskRequest extends CreateTaskRequest {}
