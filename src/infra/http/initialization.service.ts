import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { CurrencyQuoteByDateApiServiceContract } from '@local:src/domain';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { EXTERNAL_API_PATH } from '@local:src/constants';

@Injectable()
export class InitializationService implements OnModuleInit {
  private readonly coins: string[] = EXTERNAL_API_PATH.CURRENCY_NAME;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly currencyQuoteByDateApiService: CurrencyQuoteByDateApiServiceContract,
  ) {}

  async onModuleInit() {
    for (const coin of this.coins) {
      const currencies =
        await this.currencyQuoteByDateApiService.fetchCurrencyQuoteByDate(coin);
      await this.cacheManager.set(
        `currency-quote-daily-${currencies[0].name}`,
        currencies,
      );
    }
  }
}
