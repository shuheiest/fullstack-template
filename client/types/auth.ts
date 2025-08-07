import type { JWT } from 'aws-amplify/auth';

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
  accessToken: JWT;
  idToken: JWT;
  refreshToken?: JWT;
  expiresAt: number;
};
