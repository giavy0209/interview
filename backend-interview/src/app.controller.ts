import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { QueryOptions } from './decorators/query-options.decorator';
import { ApiQuery } from '@nestjs/swagger';
import { QueryOptionDto } from './dto/query-options.dto';
import { FindServerDto } from './dto/find-server.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('server')
  @ApiQuery({type : QueryOptionDto})
  async findServer(
    @Query() query: FindServerDto,
    @QueryOptions() queryOptions : QueryOptions
  ) {
    const data = await this.appService.findServer(query,queryOptions);
    return {
      data,
      message : 'Find server successfully'
    }
  }

}
