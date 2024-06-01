import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Currency } from '../../domain/entities/currency.entity';
import { firstValueFrom } from 'rxjs';
import { ExternalApiServiceContract } from 'src/domain/contracts/externalApiService.contract';

@Injectable()
export class ExternalApiService implements ExternalApiServiceContract {
  constructor(private readonly httpService: HttpService) {}

  async fetchExternalCurrencies(): Promise<Currency[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL',
        ),
      );
      const currenciesData = response.data;
      const currencies: Currency[] = Object.values(currenciesData).map(
        (data: any) =>
          new Currency(
            data.id,
            data.code,
            data.codein,
            data.name,
            parseFloat(data.high),
            parseFloat(data.low),
            parseFloat(data.varBid),
            parseFloat(data.pctChange),
            parseFloat(data.bid),
            parseFloat(data.ask),
            parseInt(data.timestamp),
            data.create_date,
          ),
      );
      return currencies;
    } catch (error) {
      console.error('Erro ao buscar moedas externas:', error);
      throw error;
    }
  }
}
