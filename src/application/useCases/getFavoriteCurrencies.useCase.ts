import { Injectable } from '@nestjs/common';
import { FavoriteCurrencyRepositoryContract } from '@local:src/domain';

@Injectable()
export class GetFavoriteCurrenciesUseCase {
  constructor(
    private readonly favoriteCurrencyRepository: FavoriteCurrencyRepositoryContract,
  ) {}

  async execute(id: string): Promise<any> {
    const result = await this.favoriteCurrencyRepository.findById(id);

    return result;
  }
}
