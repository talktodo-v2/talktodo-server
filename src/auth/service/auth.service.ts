import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../user/repository/user.repository';
import { USER_REGISTER_STATUS } from '../constant/costant';
import { LoginProvider } from '../types';

export type LoginInput = {
  provider: LoginProvider;
  email: string;
  profileImage: string;
};

type GenerateTokenParams = {
  id: string;
};

@Injectable()
export class AuthService {
  constructor(
    private users: UserRepository,
    private jwtService: JwtService
  ) {}

  // 차후에 추가
  async login({ email, provider, profileImage }: LoginInput) {
    const userExisting = await this.users.findUserByEmail(email, provider);

    if (!userExisting) await this.users.createUser(email, '임시닉네임', profileImage, provider);

    const accessToken = await this.generateToken({ id: email });

    return { accessToken, userExisting };
  }

  async register(email: string) {}

  // JWT 토큰 생성
  async generateToken({ id }: GenerateTokenParams): Promise<string> {
    return this.jwtService.sign({ id });
  }
}
