import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  FavoriteCurrencyRepositoryContract,
  UserRepositoryContract,
} from '@local:src/domain/contracts';
import { EXTERNAL_API_PATH } from '@local:src/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepositoryContract,
    private readonly favoriteCurrencyRepository: FavoriteCurrencyRepositoryContract,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user._doc.email,
      sub: user._doc._id,
      userId: user._doc._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT));
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const createdUser = await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });

    await this.favoriteCurrencyRepository.save({
      userId: createdUser['_id'],
      currenciesName: String(EXTERNAL_API_PATH.CURRENCY_NAME_CACHE),
    });

    return createdUser;
  }
}
