import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CurrencyEntity } from '../../domain/entities/currency.entity';
import { firstValueFrom } from 'rxjs';
import { ExternalApiServiceContract } from 'src/domain/contracts/externalApiService.contract';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ExternalApiService implements ExternalApiServiceContract {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async fetchExternalCurrencies(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(process.env.ECONOMY_AWESOME_API),
      );
      const currenciesData = response.data;
      const currencies: CurrencyEntity[] = Object.values(currenciesData).map(
        (data: any) => new CurrencyEntity(data),
      );
      await this.cacheService.set('cache-1', currencies);
      console.log('novo cache: ');
    } catch (error) {
      console.error('Erro ao buscar moedas externas:', error);
      throw error;
    }
  }
}
