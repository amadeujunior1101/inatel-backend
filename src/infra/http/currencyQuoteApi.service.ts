import { firstValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  CurrencyEntity,
  CurrencyQuoteApiServiceContract,
} from '@local:src/domain';
import { CurrencyGateway } from '@local:src/infra';
import { EXTERNAL_API_PATH } from '@local:src/constants';

@Injectable()
export class CurrencyQuoteApiService
  implements CurrencyQuoteApiServiceContract
{
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private readonly currencyGateway: CurrencyGateway,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async fetchCurrenciesQuote(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${process.env.ECONOMY_AWESOME_API}/last/${EXTERNAL_API_PATH.CURRENCY_ACRONYM}`,
        ),
      );
      const currenciesData = response.data;
      const currencies: CurrencyEntity[] = Object.values(currenciesData).map(
        (data: any) => new CurrencyEntity(data),
      );
      await this.cacheService.set('currency-cache', currencies);
      this.currencyGateway.broadcastCurrencyData();
    } catch (error) {
      console.error('Erro ao buscar moedas externas:', error);
      throw error;
    }
  }
}
