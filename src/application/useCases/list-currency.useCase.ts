import { Injectable } from '@nestjs/common';
import { CurrencyService } from '../../domain/services/currency.service';
import { Currency } from '../../domain/entities/currency.entity';
import { ExternalApiServiceContract } from 'src/domain/contracts/externalApiService.contract';

@Injectable()
export class ListCurrencyUseCase {
  constructor(
    private readonly currencyService: CurrencyService,
    private readonly externalApiService: ExternalApiServiceContract,
  ) {}

  async execute(): Promise<Currency[]> {
    // Obter moedas locais
    const localCurrencies = await this.currencyService.listAllCurrencies();

    // Obter moedas externas da API
    const externalCurrencies =
      await this.externalApiService.fetchExternalCurrencies();

    // send to redis cache

    // Combinar moedas locais e externas
    const allCurrencies = [...localCurrencies, ...externalCurrencies];

    return allCurrencies;
  }
}
