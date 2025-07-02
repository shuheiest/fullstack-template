// ユーザー関連の型定義
import type { UserId } from './brandedId';

export type UserDto = {
  userId: UserId;
  email: string;
  role: 'user';
};

export type AnonymousDto = {
  userId: UserId;
  email: string;
  role: 'anonymous';
};

export type UserOrAnonymousDto = UserDto | AnonymousDto;
