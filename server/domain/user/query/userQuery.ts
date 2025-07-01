// ユーザークエリ
import { prisma } from 'infrastructure/database/prisma';
import type { JwtUser } from 'api/@types/jwt';
import type { UserOrAnonymous } from 'domain/entities/User';
import { toUserEntity, createAnonymousUser } from '../repository/prismaToUserModel';

export const userQuery = {
  whoAmI: (vals: {
    userId: JwtUser['cognito:username'];
    email: string;
  }): Promise<UserOrAnonymous> =>
    prisma.user
      .findFirst({ where: { id: vals.userId } })
      .then((user) => user ? toUserEntity(user) : createAnonymousUser(vals)),
};