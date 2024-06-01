import { Injectable } from '@nestjs/common';
import { CurrencyEntity } from '../../../../domain/entities/currency.entity';
import { CurrencyRepositoryContract } from 'src/domain/contracts/currencyRepository.contract';

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
