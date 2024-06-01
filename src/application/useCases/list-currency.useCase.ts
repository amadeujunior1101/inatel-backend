import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CurrencyEntity } from '@local:src/domain';

@Injectable()
export class ListCurrencyUseCase {
  constructor(
    // private readonly currencyQuoteByDateApiService: CurrencyQuoteByDateApiServiceContract,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async execute(days: string): Promise<any> {
    console.log('filtrar para: ', days, 'dias');
    // return await this.cacheService.get('currency-quote-daily');
    const coin1 = await this.cacheService.get(
      'currency-quote-daily-Dólar Americano/Real Brasileiro',
    );
    const coin2 = await this.cacheService.get(
      'currency-quote-daily-Dólar Americano/Real Brasileiro Turismo',
    );

    return { coin1, coin2 };
  }
}
