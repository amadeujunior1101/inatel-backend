import { Currency } from '../entities/currency.entity';

export abstract class CurrencyRepositoryContract {
  abstract save(currency: Currency): Promise<void>;
  abstract findAll(): Promise<Currency[]>;
  abstract findById(id: string): Promise<Currency | undefined>;
}
