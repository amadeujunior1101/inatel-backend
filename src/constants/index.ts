export const CACHE_KEYS = {
  CURRENCY: 'cache-1',
};

export const EXTERNAL_API_PATH = {
  NAME_OF_COINS:
    'USD-BRL,USD-BRLT,EUR-BRL,BTC-BRL,CAD-BRL,GBP-BRL,JPY-BRL,CHF-BRL,AUD-BRL,CNY-BRL,ILS-BRL,ETH-BRL,XRP-BRL',
  CURRENCY_QUOTE_BY_DATE: 'json/daily',
  DAYS: 30,
};

export const CORS_CONFIG = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};
