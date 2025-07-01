// ユーザー関連の型定義
import type { UserId } from './brandedId';

export type UserDto = {
  userId: UserId;
  email: string;
};