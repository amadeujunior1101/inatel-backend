export class CurrencyEntity {
  code: string;
  codein: string;
  name: string;
  high: number;
  low: number;
  varBid: number;
  pctChange: number;
  bid: number;
  ask: number;
  timestamp: number;
  create_date: string;

  constructor(props: CurrencyEntity) {
    Object.assign(this, props);
  }
}
