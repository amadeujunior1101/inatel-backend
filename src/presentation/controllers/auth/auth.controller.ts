import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@local:src/application/auth/auth.service';
import { CreateUserDTO } from '@local:src/application';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SuccessLoginResponse, UnauthorizedResponse } from './docs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({
    type: CreateUserDTO,
  })
  @ApiOperation({ summary: 'Retorna um token jwt' })
  @ApiOkResponse(SuccessLoginResponse.getResponse())
  @ApiUnauthorizedResponse(UnauthorizedResponse.getResponse())
  async login(@Body() loginDto: CreateUserDTO) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  @ApiBody({
    type: CreateUserDTO,
  })
  @ApiOperation({ summary: 'Registra um novo usuário' })
  async register(@Body() createUserDto: CreateUserDTO) {
    return this.authService.register(createUserDto);
  }
}
