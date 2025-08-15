import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../user/repository/user.repository';
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

  async login({ email, provider, profileImage }: LoginInput) {
    // 사용자 정보 조회 또는 생성
    let user = await this.users.upsertUser(email, provider, profileImage, '임시닉네임');

    const accessToken = await this.generateToken({ id: user.id });

    return { accessToken, user };
  }

  async generateToken({ id }: GenerateTokenParams): Promise<string> {
    return this.jwtService.sign({ id });
  }
}
