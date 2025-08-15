import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginProvider } from '../../auth/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async upsertUser(email: string, provider: LoginProvider, profile: string, nickName: string) {
    const loginMap: Record<LoginProvider, Prisma.UserWhereUniqueInput> = {
      KAKAO: { kakaoEmail: email },
      GOOGLE: { googleEmail: email },
      NAVER: { naverEmail: email },
    };

    const dataMap: Record<LoginProvider, Prisma.UserCreateInput> = {
      KAKAO: { kakaoEmail: email, nickName, profile },
      GOOGLE: { googleEmail: email, nickName, profile },
      NAVER: { naverEmail: email, nickName, profile },
    };

    return this.prisma.user.upsert({
      where: loginMap[provider],
      update: {
        currentLogin: provider,
        profile,
      },
      create: {
        ...dataMap[provider],
      },
    });
  }
}
