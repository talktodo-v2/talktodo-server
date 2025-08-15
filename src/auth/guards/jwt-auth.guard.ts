import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  UnauthorizedException,
  TokenExpiredException,
  InvalidTokenException,
  LoginRequiredException,
} from '../../common/exceptions/custom-exceptions';
import { isUUID, IsUUID } from 'class-validator';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.cookies?.['access_token'];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(token);

      request.user = {
        id: payload.id,
      };

      if (!isUUID(payload.id)) {
        throw new UnauthorizedException('올바르지 않은 형식입니다.');
      }

      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new TokenExpiredException();
      } else if (error.name === 'JsonWebTokenError') {
        throw new InvalidTokenException();
      } else {
        throw new LoginRequiredException();
      }
    }
  }
}
