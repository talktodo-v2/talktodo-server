export const providers = ['GOOGLE', 'KAKAO', 'NAVER'] as const;

export type LoginProvider = (typeof providers)[number];
