// JWT関連の型定義
import type { UserId } from './brandedId';

export type AuthHeader = { authorization: string };

// JWT標準クレーム
type JwtStandardClaims = {
  sub: string;
  iss: string;
  aud: string;
  exp: number;
  iat: number;
};

// アプリケーション固有のクレーム
type JwtUserBase = {
  email: string;
  token_use: 'access' | 'id';
};

// 認証プロバイダー固有のクレーム（将来的に抽象化可能）
type AuthProviderClaims = {
  'cognito:username': UserId;
};

// 認証済みユーザー
export type JwtUser = JwtStandardClaims & JwtUserBase & AuthProviderClaims;

// 認証情報抽出用のヘルパー型
export type AuthenticatedUser = {
  userId: UserId;
  email: string;
};