import { Controller, Get, UseInterceptors, HttpCode, HttpStatus, Post, Body, Patch, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ResponseInterceptor, ResponseCode, ResponseMessage } from '../../common/interceptor/response.interceptor';
import { SUCCESS_CODES, SUCCESS_MESSAGES } from '../../common/constants/success-codes';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';
import { GoalService } from '../service/goal.service';
import { GetGoalResponse, GoalResponse, CreateGoalRequest, UpdateGoalRequest } from '../dto/index';
import { ResponseOf, ResponseArrayOf } from 'src/common/util/response-of';

@ApiTags('/goal')
@ApiCookieAuth('access_token')
@Auth()
@UseInterceptors(ResponseInterceptor)
@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @ApiOperation({ summary: '목표 목록 조회' })
  @ApiResponse({ status: HttpStatus.OK, description: '목표 목록 조회 성공', type: ResponseArrayOf(GetGoalResponse) })
  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.DATA_RETRIEVED)
  @ResponseMessage(SUCCESS_MESSAGES[SUCCESS_CODES.DATA_RETRIEVED])
  async findAll(@CurrentUser('id') authorId: string): Promise<GetGoalResponse[]> {
    return await this.goalService.findAll(authorId);
  }

  @ApiOperation({ summary: '특정 목표 조회' })
  @ApiResponse({ status: HttpStatus.OK, description: '목표 조회 성공', type: ResponseOf(GetGoalResponse) })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseCode(SUCCESS_CODES.DATA_RETRIEVED)
  @ResponseMessage(SUCCESS_MESSAGES[SUCCESS_CODES.DATA_RETRIEVED])
  async findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser('id') authorId: string): Promise<GetGoalResponse> {
    return await this.goalService.findOne(id, authorId);
  }

  @ApiOperation({ summary: '목표 생성' })
  @ApiResponse({ status: HttpStatus.CREATED, description: '목표 생성 성공', type: ResponseOf(GoalResponse) })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ResponseCode(SUCCESS_CODES.CREATED)
  @ResponseMessage(SUCCESS_MESSAGES[SUCCESS_CODES.CREATED])
  async create(@CurrentUser('id') authorId: string, @Body() body: CreateGoalRequest): Promise<GoalResponse> {
    return await this.goalService.createGoal({ authorId, content: body.content });
  }

  @ApiOperation({ summary: '특정 목표 수정' })
  @ApiResponse({ status: HttpStatus.OK, description: '목표 수정 성공', type: ResponseOf(GoalResponse) })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('id') authorId: string,
    @Body() body: UpdateGoalRequest
  ): Promise<GoalResponse> {
    return await this.goalService.updateGoal(id, { authorId, content: body.content });
  }

  @ApiOperation({ summary: '특정 목표 삭제' })
  @ApiResponse({ status: HttpStatus.OK, description: '목표 삭제 성공', type: ResponseOf(GoalResponse) })
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<GoalResponse> {
    return await this.goalService.deleteGoal(id);
  }
}
