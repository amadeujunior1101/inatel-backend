export class Currency {
  id: string;
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

  constructor(
    id: string,
    code: string,
    codein: string,
    name: string,
    high: number,
    low: number,
    varBid: number,
    pctChange: number,
    bid: number,
    ask: number,
    timestamp: number,
    create_date: string,
  ) {
    this.id = id;
    this.code = code;
    this.codein = codein;
    this.name = name;
    this.high = high;
    this.low = low;
    this.varBid = varBid;
    this.pctChange = pctChange;
    this.bid = bid;
    this.ask = ask;
    this.timestamp = timestamp;
    this.create_date = create_date;
  }
}
