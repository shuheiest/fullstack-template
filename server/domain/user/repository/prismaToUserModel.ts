// Prisma → ドメインモデル変換関数
import type { User } from '@prisma/client';
import type { UserEntity, AnonymousEntity } from 'domain/entities/User';
import { userIdParser } from 'validators/parser';

export const toUserEntity = (prismaUser: User): UserEntity => ({
  id: userIdParser.parse(prismaUser.id),
  email: prismaUser.email,
  role: 'user',
  isAuthenticated: true,
});

export const createAnonymousUser = (vals: {
  userId: string;
  email: string;
}): AnonymousEntity => ({
  id: userIdParser.parse(vals.userId),
  email: vals.email,
  role: 'anonymous',
  isAuthenticated: false,
});