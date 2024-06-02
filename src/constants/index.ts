export const CACHE_KEYS = {
  CURRENCY: 'currency-cache',
};

export const EXTERNAL_API_PATH = {
  CURRENCY_ACRONYM:
    'USD-BRL,USD-BRLT,EUR-BRL,BTC-BRL,CAD-BRL,GBP-BRL,JPY-BRL,CHF-BRL,AUD-BRL,CNY-BRL,ILS-BRL,ETH-BRL,XRP-BRL',
  CURRENCY_NAME: [
    'USD-BRL',
    'USD-BRLT',
    'EUR-BRL',
    'BTC-BRL',
    'CAD-BRL',
    'GBP-BRL',
    'JPY-BRL',
    'CHF-BRL',
    'AUD-BRL',
    'CNY-BRL',
    'ILS-BRL',
    'ETH-BRL',
    'XRP-BRL',
  ],
  CURRENCY_QUOTE_BY_DATE: 'json/daily',
  CURRENCY_NAME_CACHE: [
    'currency-quote-daily-Dólar Americano/Real Brasileiro',
    'currency-quote-daily-Dólar Americano/Real Brasileiro Turismo',
    'currency-quote-daily-Euro/Real Brasileiro',
    'currency-quote-daily-Bitcoin/Real Brasileiro',
    'currency-quote-daily-Dólar Canadense/Real Brasileiro',
    'currency-quote-daily-Libra Esterlina/Real Brasileiro',
    'currency-quote-daily-Iene Japonês/Real Brasileiro',
    'currency-quote-daily-Franco Suíço/Real Brasileiro',
    'currency-quote-daily-Dólar Australiano/Real Brasileiro',
    'currency-quote-daily-Yuan Chinês/Real Brasileiro',
    'currency-quote-daily-Novo Shekel Israelense/Real Brasileiro',
    'currency-quote-daily-Ethereum/Real Brasileiro',
    'currency-quote-daily-XRP/Real Brasileiro',
  ],
  DAYS: 30,
};

export const CORS_CONFIG = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};
