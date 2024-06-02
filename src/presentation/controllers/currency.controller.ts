import { ListCurrencyUseCase } from '@local:src/application';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CurrencyEntity } from '@local:src/domain';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly listCurrenciesUseCase: ListCurrencyUseCase) {}

  @Get(':days')
  async listCurrencies(
    @Param('days', ParseIntPipe) days: number,
  ): Promise<CurrencyEntity[]> {
    return this.listCurrenciesUseCase.execute(days);
  }
}
