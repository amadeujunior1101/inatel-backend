export abstract class CurrencyQuoteApiServiceContract {
  abstract fetchCurrenciesQuote(): Promise<void>;
}
