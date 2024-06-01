import { Injectable } from '@nestjs/common';
import { Currency } from '../../../../domain/entities/currency.entity';
import { CurrencyRepositoryContract } from 'src/domain/contracts/currencyRepository.contract';

@Injectable()
export class CurrencyRepository implements CurrencyRepositoryContract {
  private currencies: Currency[] = [];

  async save(user: Currency): Promise<void> {
    this.currencies.push(user);
  }

  async findAll(): Promise<Currency[]> {
    return this.currencies;
  }

  async findById(id: string): Promise<Currency | undefined> {
    // eslint-disable-next-line prettier/prettier
    return this.currencies.find((user) => user.id === id);
  }
}
