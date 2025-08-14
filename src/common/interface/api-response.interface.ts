export interface ApiResponse<T = any> {
  code: string;
  result: T;
  isSuccess: boolean;
  message: string;
}
