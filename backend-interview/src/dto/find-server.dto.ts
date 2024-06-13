import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

export enum SERVER_STATUS {
  AVAILABLE = 'AVAILABLE',
  UN_AVAILABLE = 'UN_AVAILABLE',
}

export enum SORT {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}
export class FindServerDto {
  @ApiProperty({ enum: SERVER_STATUS, isArray: true, required:false })
  @IsOptional()
  @IsEnum(SERVER_STATUS, { each: true })
  status?: SERVER_STATUS[]

  @ApiProperty({ enum: SORT, required:false })
  @IsOptional()
  @IsEnum(SORT)
  sort?: SORT
}