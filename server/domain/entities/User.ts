// ユーザーエンティティ
import type { UserId } from 'api/@types/brandedId';

export type UserEntity = {
  id: UserId;
  email: string;
  role: 'user';
  isAuthenticated: true;
};

export type AnonymousEntity = {
  id: UserId;
  email: string;
  role: 'anonymous';
  isAuthenticated: false;
};

export type UserOrAnonymous = UserEntity | AnonymousEntity;
