import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import {
  CurrencyEntity,
  FavoriteCurrencyRepositoryContract,
} from '@local:src/domain';
import { EXTERNAL_API_PATH } from '@local:src/constants';

@Injectable()
export class ListCurrencyUseCase {
  constructor(
    private readonly favoriteCurrencyRepository: FavoriteCurrencyRepositoryContract,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async execute(days: number): Promise<any> {
    const result = {};

    const favoriteExits = await this.favoriteCurrencyRepository.findById(
      '665befd972697fca15d7e82fa',
    );

    if (favoriteExits !== null) {
      for (const currencyKey of favoriteExits.currenciesName.split(',')) {
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
