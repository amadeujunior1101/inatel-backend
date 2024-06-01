import { Injectable } from '@nestjs/common';
import { Currency } from '../entities/currency.entity';
import { CurrencyRepositoryContract } from '../contracts/currencyRepository.contract';

@Injectable()
export class CurrencyService {
  constructor(
    private readonly currencyRepository: CurrencyRepositoryContract,
  ) {}

  async registerCurrencyFromApi(currencyData: any): Promise<void> {
    // Crie uma nova instância de Currency com os dados da API
    const currency = new Currency(
      currencyData.id,
      currencyData.code,
      currencyData.codein,
      currencyData.name,
      currencyData.high,
      currencyData.low,
      currencyData.varBid,
      currencyData.pctChange,
      currencyData.bid,
      currencyData.ask,
      currencyData.timestamp,
      currencyData.create_date,
    );

    // Salve a nova moeda no repositório
    await this.currencyRepository.save(currency);
  }

  async listAllCurrencies(): Promise<Currency[]> {
    // Retorne todas as moedas do repositório
    return this.currencyRepository.findAll();
  }
}
