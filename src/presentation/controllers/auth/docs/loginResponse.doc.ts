export class SuccessLoginResponse {
  static getResponse() {
    return {
      description: 'Successful login',
      schema: {
        type: 'object',
        properties: {
          access_token: {
            type: 'string',
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyQHRlc3QuY29tIiwic3ViIjoiNjY1Y2Y2NjVhYjE5ZDFjNWUyNTgwZDAyIiwidXNlcklkIjoiNjY1Y2Y2NjVhYjE5ZDFjNWUyNTgwZDAyIiwiaWF0IjoxNzE3Mzc0ODExLCJleHAiOjE3MTc0NjEyMTF9.EjOjQESnLRKo1zfXpzhn5u8LrMnFFBj2CensxSozGJU',
          },
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
