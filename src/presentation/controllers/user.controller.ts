import {
  CreateUserDTO,
  CreateUserUseCase,
  GetFavoriteCurrenciesUseCase,
} from '@local:src/application';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FavoriteCurrenciesEntity, UserEntity } from '@local:src/domain';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getFavoriteCurrenciesUseCase: GetFavoriteCurrenciesUseCase,
  ) {}

  @Post()
  async createUser(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
    return this.createUserUseCase.execute(createUser);
  }

  @Get(':id')
  async getFavoriteCurrencies(
    @Param('id') id: string,
  ): Promise<FavoriteCurrenciesEntity> {
    return this.getFavoriteCurrenciesUseCase.execute(id);
  }
}
