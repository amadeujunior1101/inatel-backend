import { Injectable } from '@nestjs/common';
import {
  FavoriteCurrencyRepositoryContract,
  UserRepositoryContract,
} from '@local:src/domain';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from '../dtos';
import { EXTERNAL_API_PATH } from '@local:src/constants';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryContract,
    private readonly favoriteCurrencyRepository: FavoriteCurrencyRepositoryContract,
  ) {}

  async execute(input: CreateUserDTO): Promise<any> {
    const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT));
    const passwordHash = await bcrypt.hash(input.password, salt);

    const createdUser = await this.userRepository.save({
      ...input,
      password: passwordHash,
    });

    await this.favoriteCurrencyRepository.save({
      userId: createdUser['_id'],
      currenciesName: String(EXTERNAL_API_PATH.CURRENCY_NAME_CACHE),
    });

    return createdUser;
  }
}
