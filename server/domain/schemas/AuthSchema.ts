import { z } from 'zod';

// 認証関連のスキーマ定義
export const AuthUserSchema = z.object({
  sub: z.string(), // Cognito User ID
  email: z.string().email(),
  emailVerified: z.boolean(),
  username: z.string(),
  attributes: z.record(z.string()).optional(),
});
export type AuthUser = z.infer<typeof AuthUserSchema>;

export const SignUpRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
});
export type SignUpRequest = z.infer<typeof SignUpRequestSchema>;

export const SignInRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type SignInRequest = z.infer<typeof SignInRequestSchema>;

export const ConfirmSignUpRequestSchema = z.object({
  email: z.string().email(),
  confirmationCode: z.string().length(6),
});
export type ConfirmSignUpRequest = z.infer<typeof ConfirmSignUpRequestSchema>;

export const AuthTokenSchema = z.object({
  accessToken: z.string(),
  idToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
});
export type AuthToken = z.infer<typeof AuthTokenSchema>;

export const JWTPayloadSchema = z.object({
  sub: z.string(),
  email: z.string(),
  username: z.string(),
  exp: z.number(),
  iat: z.number(),
});
export type JWTPayload = z.infer<typeof JWTPayloadSchema>;
