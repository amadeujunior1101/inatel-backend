import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { FavoriteCurrencyRepositoryContract } from '@local:src/domain';

@Injectable()
export class GetFavoriteCurrenciesUseCase {
  constructor(
    private readonly favoriteCurrencyRepository: FavoriteCurrencyRepositoryContract,
  ) {}

  async execute(token: string): Promise<any> {
    let userId: string | null = null;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        sub: string;
      };
      userId = decoded.sub;

      const result = await this.favoriteCurrencyRepository.findById(userId);

      return result;
    } catch (err) {
      console.log('Failed to find favorite currency', err);
    }
  }
}
