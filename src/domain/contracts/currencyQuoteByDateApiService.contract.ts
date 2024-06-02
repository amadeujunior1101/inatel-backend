import { CurrencyEntity } from '@local:src/domain';

export abstract class CurrencyQuoteByDateApiServiceContract {
  abstract fetchCurrencyQuoteByDate(
    currency: string,
  ): Promise<CurrencyEntity[]>;
}
