import { CacheKey } from '@nestjs/cache-manager';
import { CacheTTL, Controller, Get } from '@nestjs/common';
import { CurrencyDTO } from 'src/application/dtos/currency.dto';
import { ListCurrencyUseCase } from 'src/application/useCases/list-currency.useCase';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly listCurrenciesUseCase: ListCurrencyUseCase) {}

  // @UseInterceptors(CacheInterceptor)
  // @CacheKey('cache-1')
  // @CacheTTL(30)
  @Get()
  async listCurrencies(): Promise<CurrencyDTO[]> {
    return this.listCurrenciesUseCase.execute();
  }
}
