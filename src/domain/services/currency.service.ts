import { Injectable } from '@nestjs/common';
import { CurrencyEntity, CurrencyRepositoryContract } from '@local:src/domain';

@Injectable()
export class CurrencyService {
  constructor(
    private readonly currencyRepository: CurrencyRepositoryContract,
  ) {}

  async registerCurrencyFromApi(currencyData: any): Promise<void> {
    const currency = new CurrencyEntity(currencyData);

    await this.currencyRepository.save(currency);
  }

  async listAllCurrencies(): Promise<CurrencyEntity[]> {
    return this.currencyRepository.findAll();
  }
}
