import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '../../common/exceptions/custom-exceptions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['access_token'];

    if (!token) {
      throw new UnauthorizedException('토큰이 제공되지 않았습니다');
    }

    try {
      const payload = this.jwtService.verify(token);

      request.user = {
        id: payload.id,
        email: payload.email,
        provider: payload.provider,
        profileImage: payload.profileImage,
      };

      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('토큰이 만료되었습니다');
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('유효하지 않은 토큰입니다');
      } else {
        throw new UnauthorizedException('토큰 검증에 실패했습니다');
      }
    }
  }
}
