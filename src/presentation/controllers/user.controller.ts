import {
  GetFavoriteCurrenciesUseCase,
  UpdateFavoriteCurrenciesUseCase,
} from '@local:src/application';
import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { FavoriteCurrenciesEntity } from '@local:src/domain';
import { JwtAuthGuard } from '@local:src/application/auth';

@Controller('users')
export class UserController {
  constructor(
    private readonly getFavoriteCurrenciesUseCase: GetFavoriteCurrenciesUseCase,
    private readonly updateFavoriteCurrenciesUseCase: UpdateFavoriteCurrenciesUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getFavoriteCurrencies(
    @Request() req: any,
  ): Promise<FavoriteCurrenciesEntity> {
    const token = req.headers.authorization.split(' ')[1];
    return this.getFavoriteCurrenciesUseCase.execute(token);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateFavoriteCurrencies(
    @Body('currenciesName') currenciesName: string,
    @Request() req: any,
  ): Promise<FavoriteCurrenciesEntity> {
    const token = req.headers.authorization.split(' ')[1];
    return this.updateFavoriteCurrenciesUseCase.execute(currenciesName, token);
  }
}
