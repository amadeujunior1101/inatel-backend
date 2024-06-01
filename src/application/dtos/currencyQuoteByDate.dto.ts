import { IsInt, IsNumber } from 'class-validator';

export class CurrencyQuoteByDateDTO {
  @IsNumber()
  @IsInt()
  days: number;
}
