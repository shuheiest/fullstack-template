import type { Prisma } from '@prisma/client'
import type { User } from '@/domain/schemas/UserSchema'
import type { UserRepository } from '@/domain/repositories/UserRepository'
import { createUser, updateUserName, isValidUserName, isValidUserEmail } from '@/domain/entities/User'

export const createUserService = (userRepo: UserRepository) => ({
  createUser: async (
    tx: Prisma.TransactionClient,
    props: { email: string; name: string }
  ): Promise<User> => {
    if (!isValidUserEmail(props.email)) {
      throw new Error('Invalid email format')
    }
    if (!isValidUserName(props.name)) {
      throw new Error('Invalid name')
    }

    const existingUser = await userRepo.findByEmail(tx, props.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const user = createUser(props)
    await userRepo.save(tx, user)
    return user
  },

  updateUserName: async (
    tx: Prisma.TransactionClient,
    userId: string,
    newName: string
  ): Promise<User> => {
    if (!isValidUserName(newName)) {
      throw new Error('Invalid name')
    }

    const user = await userRepo.findById(tx, userId)
    if (!user) {
      throw new Error('User not found')
    }

    const updatedUser = updateUserName(user, newName)
    await userRepo.save(tx, updatedUser)
    return updatedUser
  },

  getUserById: async (tx: Prisma.TransactionClient, userId: string): Promise<User> => {
    const user = await userRepo.findById(tx, userId)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  },

  getAllUsers: async (tx: Prisma.TransactionClient): Promise<User[]> => {
    return await userRepo.findAll(tx)
  },
})