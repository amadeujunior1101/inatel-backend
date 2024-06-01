import { CurrencyEntity } from '../entities/currency.entity';

export abstract class CurrencyRepositoryContract {
  abstract save(currency: CurrencyEntity): Promise<void>;
  abstract findAll(): Promise<CurrencyEntity[]>;
  abstract findById(id: string): Promise<CurrencyEntity | undefined>;
}
