import { Controller, Get, Post, Body } from '@nestjs/common';
import { CurrencyDTO } from 'src/application/dtos/currency.dto';
import { ListCurrencyUseCase } from 'src/application/useCases/list-currency.useCase';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly listCurrenciesUseCase: ListCurrencyUseCase) {}

  @Get()
  async listCurrencies(): Promise<CurrencyDTO[]> {
    return this.listCurrenciesUseCase.execute();
  }
}
