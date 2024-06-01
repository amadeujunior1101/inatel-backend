import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { CurrencyQuoteByDateApiServiceContract } from '@local:src/domain';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { EXTERNAL_API_PATH } from '@local:src/constants';

@Injectable()
export class InitializationService implements OnModuleInit {
  private readonly coins: string[] = ['USD-BRL', 'USD-BRLT'];
  // EXTERNAL_API_PATH.NAME_OF_COINS

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly currencyQuoteByDateApiService: CurrencyQuoteByDateApiServiceContract,
  ) {}

  async onModuleInit() {
    for (const coin of this.coins) {
      const currencies =
        await this.currencyQuoteByDateApiService.fetchCurrencyQuoteByDate(coin);
      console.log(
        'Inicializando aplicação e carregando dados de moedas...',
        `currency-quote-daily-${currencies[0].name}`,
      );
      await this.cacheManager.set(
        `currency-quote-daily-${currencies[0].name}`,
        currencies,
      );
    }
    console.log('Dados de moedas carregados e armazenados no cache.');
  }
}
