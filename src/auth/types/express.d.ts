// Express Request 타입 확장
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        provider?: string;
        profileImage?: string;
        createdAt?: Date;
        [key: string]: any;
      };
    }
  }
}

export {};
