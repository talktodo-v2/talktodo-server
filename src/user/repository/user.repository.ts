import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginProvider } from '../../auth/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string, provider: LoginProvider) {
    const fieldMap: Record<LoginProvider, Prisma.UserWhereUniqueInput> = {
      KAKAO: { kakaoEmail: email },
      GOOGLE: { googleEmail: email },
      NAVER: { naverEmail: email },
    };

    return this.prisma.user.findUnique({
      where: fieldMap[provider],
    });
  }

  async createUser(email: string, nickName: string, profile: string, provider: LoginProvider) {
    const dataMap: Record<LoginProvider, Prisma.UserCreateInput> = {
      KAKAO: { kakaoEmail: email, nickName, profile },
      GOOGLE: { googleEmail: email, nickName, profile },
      NAVER: { naverEmail: email, nickName, profile },
    };

    return this.prisma.user.create({
      data: dataMap[provider],
    });
  }
}
