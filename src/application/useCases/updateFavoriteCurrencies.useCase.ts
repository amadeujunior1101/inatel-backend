import * as jwt from 'jsonwebtoken';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  FavoriteCurrencyRepositoryContract,
  UserRepositoryContract,
} from '@local:src/domain';

@Injectable()
export class UpdateFavoriteCurrenciesUseCase {
  constructor(
    private readonly favoriteCurrencyRepository: FavoriteCurrencyRepositoryContract,
    private readonly userRepository: UserRepositoryContract,
  ) {}

  async execute(currenciesName: string, token: string): Promise<any> {
    let userId: string | null = null;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        sub: string;
      };
      userId = decoded.sub;

      const userExists = await this.userRepository.findById(userId);

      if (!userExists) return new BadRequestException('user not found');

      await this.favoriteCurrencyRepository.update(
        { userId },
        { currenciesName },
        { upsert: true },
      );
    } catch (error) {
      console.error('Token inválido:', error);
    }
  }
}
