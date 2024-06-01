import { Inject, Injectable } from '@nestjs/common';
import { CurrencyEntity } from '../../domain/entities/currency.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ListCurrencyUseCase {
  constructor(
    // private readonly externalApiService: ExternalApiServiceContract,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async execute(): Promise<CurrencyEntity[]> {
    const cachedData = await this.cacheService.get<{ name: string }>('cache-1');
    // if (cachedData) {
    //   console.log(`Getting data from cache!`);
    //   const currencies: Currency[] = Object.values(cachedData).map(
    //     (data: any) =>
    //       new Currency(
    //         data.id,
    //         data.code,
    //         data.codein,
    //         data.name,
    //         parseFloat(data.high),
    //         parseFloat(data.low),
    //         parseFloat(data.varBid),
    //         parseFloat(data.pctChange),
    //         parseFloat(data.bid),
    //         parseFloat(data.ask),
    //         parseInt(data.timestamp),
    //         data.create_date,
    //       ),
    //   );

    //   return currencies;
    // }
    // console.log(`sem cache!`);

    return await this.cacheService.get('cache-1');
  }
}
