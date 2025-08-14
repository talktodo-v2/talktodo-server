import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { KakaoStrategy } from '../kakao.strategy';
import { AuthService } from '../service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from '../../user/repository/user.repository';
import { PrismaService } from '../../prisma.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [KakaoStrategy, AuthService, UserRepository, PrismaService, JwtAuthGuard],
  exports: [AuthService, JwtModule, JwtAuthGuard],
})
export class AuthModule {}
