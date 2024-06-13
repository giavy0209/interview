import { ApiProperty } from '@nestjs/swagger'

export class QueryOptionDto {
  @ApiProperty({ example: 1, required:false })
  page?: number
  @ApiProperty({ example: 10, required:false })
  limit?: number
}
