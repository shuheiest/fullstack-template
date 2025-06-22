import { createUserService } from '@/application/services/UserService';
import { prisma } from '@/infrastructure/database/prisma';
import { userRepo } from '@/infrastructure/repositories/UserRepositoryImpl';
import type { Prisma } from '@prisma/client';
import { defineController } from './$relay';

const userService = createUserService(userRepo);

export default defineController(() => ({
  get: async () => {
    try {
      const users = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        return await userService.getAllUsers(tx);
      });
      return { status: 200, body: users };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { status: 500, body: [] };
    }
  },

  post: async ({ body }) => {
    const user = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      return await userService.createUser(tx, {
        email: body.email,
        name: body.name,
      });
    });
    return { status: 201, body: user };
  },
}));
