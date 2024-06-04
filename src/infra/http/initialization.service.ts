import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { CurrencyQuoteByDateApiServiceContract } from '@local:src/domain';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CACHE_DURATION_TIME, EXTERNAL_API_PATH } from '@local:src/constants';

@Injectable()
export class InitializationService implements OnModuleInit {
  private readonly currencies: string[] = EXTERNAL_API_PATH.CURRENCY_NAME;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly currencyQuoteByDateApiService: CurrencyQuoteByDateApiServiceContract,
  ) {}

  async onModuleInit() {
    for (const currency of this.currencies) {
      const currencies =
        await this.currencyQuoteByDateApiService.fetchCurrencyQuoteByDate(
          currency,
        );

      await this.cacheManager.set(
        `currency-quote-daily-${currencies[0].name}`,
        currencies,
        CACHE_DURATION_TIME.history,
      );
    }
  }
}
