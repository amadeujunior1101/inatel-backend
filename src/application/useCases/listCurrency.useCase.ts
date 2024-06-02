import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CurrencyEntity } from '@local:src/domain';
import { EXTERNAL_API_PATH } from '@local:src/constants';

@Injectable()
export class ListCurrencyUseCase {
  constructor(
    // private readonly currencyQuoteByDateApiService: CurrencyQuoteByDateApiServiceContract,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async execute(days: number): Promise<any> {
    const result = {};

    for (const currencyKey of EXTERNAL_API_PATH.CURRENCY_NAME_CACHE) {
      const currencyData = await this.cacheService.get<CurrencyEntity[]>(
        currencyKey,
      );

      if (currencyData && Array.isArray(currencyData)) {
        const recentData = currencyData.slice(0, days);
        const currencyName = currencyKey.replace('currency-quote-daily-', '');

        result[currencyName] = recentData;
      }
    }

    return result;
  }
}
