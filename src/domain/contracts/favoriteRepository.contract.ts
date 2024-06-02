import { FavoriteCurrenciesEntity } from '@local:src/domain';

export abstract class FavoriteCurrencyRepositoryContract {
  abstract save(
    favorites: FavoriteCurrenciesEntity,
  ): Promise<FavoriteCurrenciesEntity>;
  abstract findById(id: string): Promise<FavoriteCurrenciesEntity | undefined>;
  abstract update(favorites: FavoriteCurrenciesEntity): Promise<void>;
}
