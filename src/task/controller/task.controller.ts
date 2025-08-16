import {
  Controller,
  Get,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Patch,
  Query,
  Delete,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { ResponseInterceptor, ResponseCode, ResponseMessage } from '../../common/interceptor/response.interceptor';
import { TransformInterceptor } from '../../common/interceptor/transform.interceptor';
import { SUCCESS_CODES, SUCCESS_MESSAGES } from '../../common/constants/success-codes';
import { CreateTaskRequest, TaskResponse, TaskBulkResponse, GetTaskQuery, CreateTaskListRequest, UpdateTaskRequest } from '../dto/index';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';
import { ResponseOf, ResponseArrayOf } from 'src/common/util/response-of';

@ApiTags('/task')
@ApiCookieAuth('access_token')
@Auth()
@UseInterceptors(ResponseInterceptor)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: '단건 할 일 조회' })
  @ApiResponse({ status: HttpStatus.OK, description: '할 일 조회 성공', type: ResponseOf(TaskResponse) })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.DATA_RETRIEVED)
  @ResponseMessage(SUCCESS_MESSAGES[SUCCESS_CODES.DATA_RETRIEVED])
  @UseInterceptors(new TransformInterceptor(TaskResponse))
  async getTaskById(@Param('id', new ParseUUIDPipe()) id: string): Promise<TaskResponse> {
    return await this.taskService.findTaskById(id);
  }

  @ApiOperation({ summary: '단건 할 일 생성' })
  @ApiResponse({ status: HttpStatus.CREATED, description: '할 일 생성 성공', type: ResponseOf(TaskResponse) })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ResponseCode(SUCCESS_CODES.CREATED)
  @ResponseMessage(SUCCESS_MESSAGES[SUCCESS_CODES.CREATED])
  @UseInterceptors(new TransformInterceptor(TaskResponse))
  async createTask(@Body() dto: CreateTaskRequest, @CurrentUser('id') authorId: string): Promise<TaskResponse> {
    return await this.taskService.createTask({
      authorId,
      ...dto,
    });
  }

  @ApiOperation({ summary: '단건 할 일 수정' })
  @ApiResponse({ status: HttpStatus.OK, description: '할 일 수정 성공', type: ResponseOf(TaskResponse) })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.NO_CONTENT)
  @ResponseMessage(SUCCESS_MESSAGES[SUCCESS_CODES.NO_CONTENT])
  @UseInterceptors(new TransformInterceptor(TaskResponse))
  async updateTask(
    @Body() dto: UpdateTaskRequest,
    @CurrentUser('id') authorId: string,
    @Param('id', new ParseUUIDPipe()) id: string
  ): Promise<TaskResponse> {
    return await this.taskService.updateTaskById(id, {
      authorId,
      ...dto,
    });
  }

  @ApiOperation({ summary: '단건 할 일 삭제' })
  @ApiResponse({ status: HttpStatus.OK, description: '할 일 삭제 성공', type: ResponseOf(TaskResponse) })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.DELETED)
  @ResponseMessage(SUCCESS_MESSAGES[SUCCESS_CODES.DELETED])
  @UseInterceptors(new TransformInterceptor(TaskResponse))
  async deleteTask(@Param('id', new ParseUUIDPipe()) id: string): Promise<TaskResponse> {
    return await this.taskService.deleteTaskById(id);
  }

  @ApiOperation({ summary: '다건 할 일 조회' })
  @ApiResponse({ status: HttpStatus.OK, description: '할 일 목록 조회 성공', type: ResponseArrayOf(TaskResponse) })
  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.DATA_RETRIEVED)
  @ResponseMessage(SUCCESS_MESSAGES[SUCCESS_CODES.DATA_RETRIEVED])
  @UseInterceptors(new TransformInterceptor(TaskResponse))
  async getTask(@CurrentUser('id') authorId: string, @Query() query: GetTaskQuery): Promise<TaskResponse[]> {
    const task = await this.taskService.findManyTaskById(authorId, query);

    return task;
  }

  @ApiOperation({ summary: '다건 할 일 생성' })
  @ApiResponse({ status: HttpStatus.OK, description: '할 일 생성 성공', type: ResponseOf(TaskResponse) })
  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  @ResponseCode(SUCCESS_CODES.CREATED)
  @ResponseMessage(SUCCESS_MESSAGES[SUCCESS_CODES.CREATED])
  async createManyTasks(@Body() dtos: CreateTaskListRequest, @CurrentUser('id') authorId: string): Promise<TaskBulkResponse> {
    return await this.taskService.createManyTasks(
      dtos.items.map((dto) => ({
        authorId,
        ...dto,
      }))
    );
  }
}
