import { Injectable } from '@nestjs/common';
import { CurrencyEntity, CurrencyRepositoryContract } from '@local:src/domain';

@Injectable()
export class CurrencyRepository implements CurrencyRepositoryContract {
  private currencies: CurrencyEntity[] = [];

  async save(user: CurrencyEntity): Promise<void> {
    this.currencies.push(user);
  }

  async findAll(): Promise<CurrencyEntity[]> {
    return this.currencies;
  }

  async findById(code: string): Promise<CurrencyEntity | undefined> {
    // eslint-disable-next-line prettier/prettier
    return this.currencies.find((user) => user.code === code);
  }
}
