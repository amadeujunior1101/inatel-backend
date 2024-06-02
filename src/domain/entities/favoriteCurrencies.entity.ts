export class FavoriteCurrenciesEntity {
  userId: string;
  currenciesName: string;

  constructor(props: FavoriteCurrenciesEntity) {
    Object.assign(this, props);
  }
}
