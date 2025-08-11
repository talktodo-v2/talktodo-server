import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('KAKAO_CLIENT_ID') || '',
      callbackURL: configService.get<string>('KAKAO_CALLBACK_URL') || '',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const raw = JSON.parse(profile._raw);
    const email = raw.kakao_account.email;
    const profileImage = raw.kakao_account.profile.profile_image_url;

    return {
      provider: 'KAKAO',
      email: email,
      // 임시 프로필 이미지
      profileImage: profileImage || 'https://i.postimg.cc/66yFgbNP/218189882.png',
    };
  }
}
