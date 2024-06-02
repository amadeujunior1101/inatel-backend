import { FavoriteCurrenciesEntity } from '@local:src/domain';

export abstract class FavoriteCurrencyRepositoryContract {
  abstract save(
    favorites: FavoriteCurrenciesEntity,
  ): Promise<FavoriteCurrenciesEntity>;
  abstract findById(
    userId: string,
  ): Promise<FavoriteCurrenciesEntity | undefined>;
  abstract update(filter: any, update: any, options?: any): Promise<void>;
}
