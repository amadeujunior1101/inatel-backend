export class SuccessListCurrencyResponse {
  static getResponse() {
    return {
      description: 'Successful currencies',
      schema: {
        type: 'object',
        properties: {
          'Dólar Americano/Real Brasileiro': {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                code: { type: 'string' },
                codein: { type: 'string' },
                name: { type: 'string' },
                high: { type: 'string' },
                low: { type: 'string' },
                varBid: { type: 'string' },
                pctChange: { type: 'string' },
                bid: { type: 'string' },
                ask: { type: 'string' },
                timestamp: { type: 'string' },
                create_date: { type: 'string' },
              },
            },
          },
        },
      },
    };
  }
}
