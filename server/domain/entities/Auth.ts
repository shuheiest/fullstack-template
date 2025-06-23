import type { AuthToken, AuthUser } from '../schemas/AuthSchema';

// 認証関連のビジネスロジック（純粋関数）

export const createAuthUser = (
  sub: string,
  email: string,
  username: string,
  emailVerified = false,
): AuthUser => ({
  sub,
  email,
  emailVerified,
  username,
});

export const isEmailVerified = (authUser: AuthUser): boolean => authUser.emailVerified;

export const isTokenExpired = (token: AuthToken, currentTime: number): boolean => {
  const expirationTime = Date.now() + token.expiresIn * 1000;
  return currentTime > expirationTime;
};

export const maskEmail = (email: string): string => {
  const [local, domain] = email.split('@');
  if (local === undefined || domain === undefined) return email;

  const maskedLocal =
    local.length > 2 ? local.substring(0, 2) + '*'.repeat(local.length - 2) : local;
  return `${maskedLocal}@${domain}`;
};

export const verifyEmail = (authUser: AuthUser): AuthUser => ({
  ...authUser,
  emailVerified: true,
});
