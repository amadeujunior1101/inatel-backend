export abstract class ExternalApiServiceContract {
  abstract fetchExternalCurrencies(): Promise<void>;
}
