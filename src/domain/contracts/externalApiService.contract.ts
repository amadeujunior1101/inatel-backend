import { Currency } from '../entities/currency.entity';

export abstract class ExternalApiServiceContract {
  abstract fetchExternalCurrencies(): Promise<Currency[]>;
}
