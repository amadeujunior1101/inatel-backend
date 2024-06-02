import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as jwt from 'jsonwebtoken';
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

  async execute(days: number, token?: string): Promise<any> {
    const result = {};

    let userId: string | null = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
          sub: string;
        };
        userId = decoded.sub;
      } catch (error) {
        console.error('Token inválido:', error);
      }
    }

    if (userId) {
      const favoriteExits = await this.favoriteCurrencyRepository.findById(
        userId,
      );

      if (favoriteExits) {
        for (const currencyKey of favoriteExits.currenciesName.split(',')) {
          const currencyData = await this.cacheService.get<CurrencyEntity[]>(
            currencyKey,
          );

          if (currencyData && Array.isArray(currencyData)) {
            const recentData = currencyData.slice(0, days);
            const currencyName = currencyKey.replace(
              'currency-quote-daily-',
              '',
            );

            result[currencyName] = recentData;
          }
        }

        return result;
      }
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
