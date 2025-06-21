import type { Prisma } from '@prisma/client';
import { defineController } from './$relay';
import { createUserService } from '@/application/services/UserService';
import { userRepo } from '@/infrastructure/repositories/UserRepositoryImpl';
import { prisma } from '@/infrastructure/database/prisma';

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
    try {
      const user = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        return await userService.createUser(tx, {
          email: body.email,
          name: body.name,
        });
      });
      return { status: 201, body: user };
    } catch (error) {
      console.error('Error creating user:', error);
      if (error instanceof Error) {
        if (error.message.includes('already exists')) {
          return { status: 409, body: null };
        }
        if (error.message.includes('Invalid')) {
          return { status: 400, body: null };
        }
      }
      return { status: 500, body: null };
    }
  },
}));
