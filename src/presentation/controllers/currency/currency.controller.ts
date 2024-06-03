import { ListCurrencyUseCase } from '@local:src/application';
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CurrencyEntity } from '@local:src/domain';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessListCurrencyResponse } from './docs';

@ApiTags('currencies')
@Controller('currencies')
export class CurrencyController {
  constructor(private readonly listCurrenciesUseCase: ListCurrencyUseCase) {}

  @Get(':days')
  @ApiQuery({ name: 'token', required: false })
  @ApiOperation({ summary: 'Historico de cotação das moedas' })
  @ApiOkResponse(SuccessListCurrencyResponse.getResponse())
  async listCurrencies(
    @Param('days', ParseIntPipe) days: number,
    @Query('token') token?: string,
  ): Promise<CurrencyEntity[]> {
    return this.listCurrenciesUseCase.execute(days, token);
  }
}
