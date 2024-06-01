import { Injectable } from '@nestjs/common';
import { CurrencyEntity } from '../entities/currency.entity';
import { CurrencyRepositoryContract } from '../contracts/currencyRepository.contract';

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
    // Retorne todas as moedas do repositório
    return this.currencyRepository.findAll();
  }
}
