export class SuccessFavoriteCurrencyResponse {
  static getResponse() {
    return {
      description: 'Successful currencies',
      schema: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          userId: { type: 'string' },
          currenciesName: { type: 'string' },
        },
      },
    };
  }
}

export class UnauthorizedResponse {
  static getResponse() {
    return {
      description: 'Invalid credentials',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 401 },
          message: { type: 'string', example: 'Invalid credentials' },
          error: { type: 'string', example: 'Unauthorized' },
        },
      },
    };
  }
}
