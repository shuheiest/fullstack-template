// JWT検証サービス（関数型、簡潔版）
import type { FastifyRequest } from 'fastify';
import type { JwtUser, AuthenticatedUser } from 'api/@types/jwt';
import { userIdParser } from '../../validators/parser';

export type JwtVerificationResult = {
  success: true;
  user: AuthenticatedUser;
} | {
  success: false;
  error: 'AUTHENTICATION_FAILED';
};

// JWT検証結果をビジネスロジック用の型に変換する関数
const transformJwtUser = (jwtUser: JwtUser): AuthenticatedUser => ({
  userId: userIdParser.parse(jwtUser['cognito:username']),
  email: jwtUser.email,
});

// 成功レスポンスを作成する関数
const successResult = (user: AuthenticatedUser): JwtVerificationResult => ({
  success: true,
  user,
});

// 失敗レスポンスを作成する関数
const failureResult = (): JwtVerificationResult => ({
  success: false,
  error: 'AUTHENTICATION_FAILED',
});

// Fastifyリクエストから認証情報を取得する関数
export const extractAuthFromRequest = (request: FastifyRequest): Promise<JwtVerificationResult> =>
  request
    .jwtVerify()
    .then((jwtUser: JwtUser) => successResult(transformJwtUser(jwtUser)))
    .catch(() => failureResult());

// 認証が必要なエンドポイント用のヘルパー
export const requireAuth = (request: FastifyRequest): Promise<AuthenticatedUser> =>
  extractAuthFromRequest(request).then((result) =>
    result.success
      ? Promise.resolve(result.user)
      : Promise.reject(new Error('Authentication failed')),
  );