import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  CurrencyEntity,
  CurrencyQuoteByDateApiServiceContract,
} from '@local:src/domain';
import { EXTERNAL_API_PATH } from '@local:src/constants';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CurrencyQuoteByDateApiService
  implements CurrencyQuoteByDateApiServiceContract
{
  constructor(private readonly httpService: HttpService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async fetchCurrencyQuoteByDate(coin: string): Promise<CurrencyEntity[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${process.env.ECONOMY_AWESOME_API}/${EXTERNAL_API_PATH.CURRENCY_QUOTE_BY_DATE}/${coin}/${EXTERNAL_API_PATH.DAYS}`,
        ),
      );
      const currenciesData = response.data;
      const currencies: CurrencyEntity[] = Object.values(currenciesData).map(
        (data: any) => new CurrencyEntity(data),
      );

      return currencies;
    } catch (error) {
      console.error('Erro ao buscar moedas externas:', error);
      throw error;
    }
  }
}
