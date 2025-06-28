// 認証関連の共通型定義（クライアント・サーバー共通）
import type { UserId } from './brandedId';

export type SignUpRequest = {
  email: string;
  password: string;
  username: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type ConfirmSignUpRequest = {
  email: string;
  confirmationCode: string;
};

export type AuthToken = {
  provider: 'cognito';
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type SignUpResponse = {
  userSub?: UserId;
  message: string;
};
