import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

export function ResponseOf<TModel extends Type<any>>(model: TModel) {
  @ApiExtraModels(model)
  class ResponseDto {
    @ApiProperty()
    code!: string;

    @ApiProperty()
    isSuccess!: boolean;

    @ApiProperty()
    message!: string;

    @ApiProperty({ type: () => model })
    result!: InstanceType<TModel>;
  }
  return ResponseDto;
}

export function ResponseArrayOf<TModel extends Type<any>>(model: TModel) {
  @ApiExtraModels(model)
  class ResponseArrayDto {
    @ApiProperty({ example: 'S200000' })
    code!: string;

    @ApiProperty({ example: true })
    isSuccess!: boolean;

    @ApiProperty({ example: 'Success' })
    message!: string;

    @ApiProperty({ isArray: true, type: () => model })
    result!: InstanceType<TModel>[];
  }
  Object.defineProperty(ResponseArrayDto, 'name', {
    value: `ResponseArrayOf${model.name}`,
  });
  return ResponseArrayDto;
}
