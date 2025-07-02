// ユーザークエリ
import type { JwtUser } from 'api/@types/jwt';
import type { UserOrAnonymous } from 'domain/entities/User';
import { prisma } from 'infrastructure/database/prisma';
import { prismaToUserEntity, toAnonymousUser } from '../repository/prismaToUserModel';

export const userQuery = {
  whoAmI: (vals: {
    userId: JwtUser['cognito:username'];
    email: string;
  }): Promise<UserOrAnonymous> =>
    prisma.user
      .findFirst({ where: { id: vals.userId } })
      .then((user) => (user ? prismaToUserEntity(user) : toAnonymousUser(vals))),
};
