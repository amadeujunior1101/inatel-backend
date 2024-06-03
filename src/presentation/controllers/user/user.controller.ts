import {
  GetFavoriteCurrenciesUseCase,
  UpdateFavoriteCurrenciesUseCase,
} from '@local:src/application';
import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { FavoriteCurrenciesEntity } from '@local:src/domain';
import { JwtAuthGuard } from '@local:src/application/auth';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SuccessFavoriteCurrencyResponse, UnauthorizedResponse } from './docs';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private readonly getFavoriteCurrenciesUseCase: GetFavoriteCurrenciesUseCase,
    private readonly updateFavoriteCurrenciesUseCase: UpdateFavoriteCurrenciesUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  @ApiOperation({ summary: 'Retorna as moedas favoritas' })
  @ApiOkResponse(SuccessFavoriteCurrencyResponse.getResponse())
  @ApiUnauthorizedResponse(UnauthorizedResponse.getResponse())
  async getFavoriteCurrencies(
    @Request() req: any,
  ): Promise<FavoriteCurrenciesEntity> {
    const token = req.headers.authorization.split(' ')[1];
    return this.getFavoriteCurrenciesUseCase.execute(token);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiOperation({ summary: 'Atualiza a lista de moedas favoritas' })
  @ApiUnauthorizedResponse(UnauthorizedResponse.getResponse())
  async updateFavoriteCurrencies(
    @Body('currenciesName') currenciesName: string,
    @Request() req: any,
  ): Promise<FavoriteCurrenciesEntity> {
    const token = req.headers.authorization.split(' ')[1];
    return this.updateFavoriteCurrenciesUseCase.execute(currenciesName, token);
  }
}
