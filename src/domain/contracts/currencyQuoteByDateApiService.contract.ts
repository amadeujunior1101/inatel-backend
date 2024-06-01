import { CurrencyEntity } from '@local:src/domain';

export abstract class CurrencyQuoteByDateApiServiceContract {
  abstract fetchCurrencyQuoteByDate(coin: string): Promise<CurrencyEntity[]>;
}
