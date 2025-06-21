import type { Prisma } from '@prisma/client'
import type { User } from '@/domain/schemas/UserSchema'
import type { UserRepository } from '@/domain/repositories/UserRepository'

export const userRepo: UserRepository = {
  findById: async (tx: Prisma.TransactionClient, id: string): Promise<User | null> => {
    const user = await tx.user.findUnique({
      where: { id },
    })
    return user ? mapToDomain(user) : null
  },

  findByEmail: async (tx: Prisma.TransactionClient, email: string): Promise<User | null> => {
    const user = await tx.user.findUnique({
      where: { email },
    })
    return user ? mapToDomain(user) : null
  },

  save: async (tx: Prisma.TransactionClient, user: User): Promise<void> => {
    await tx.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email,
        name: user.name,
        updatedAt: user.updatedAt,
      },
      create: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  },

  delete: async (tx: Prisma.TransactionClient, id: string): Promise<void> => {
    await tx.user.delete({
      where: { id },
    })
  },

  findAll: async (tx: Prisma.TransactionClient): Promise<User[]> => {
    const users = await tx.user.findMany()
    return users.map(mapToDomain)
  },
}

const mapToDomain = (prismaUser: any): User => ({
  id: prismaUser.id,
  email: prismaUser.email,
  name: prismaUser.name,
  createdAt: prismaUser.createdAt,
  updatedAt: prismaUser.updatedAt,
})