import type { ConfirmSignUpRequest, SignInRequest, SignUpRequest } from '../schemas/AuthSchema';

// 認証関連のバリデーション関数（純粋関数）

const isValidEmail = (email: string): boolean =>
  email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidPassword = (password: string): boolean =>
  password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);

const isValidUsername = (username: string): boolean =>
  username.length >= 3 && username.length <= 20;

export const validateSignUp = (request: SignUpRequest): boolean =>
  isValidEmail(request.email) &&
  isValidPassword(request.password) &&
  isValidUsername(request.username) &&
  request.password !== request.email;

export const validateSignIn = (request: SignInRequest): boolean =>
  isValidEmail(request.email) && request.password.length > 0;

export const validateConfirmSignUp = (request: ConfirmSignUpRequest): boolean =>
  isValidEmail(request.email) &&
  request.confirmationCode.length === 6 &&
  /^[0-9]{6}$/.test(request.confirmationCode);
