import type { User } from '../schemas/UserSchema'
import type { Prisma } from '@prisma/client'

export interface UserRepository {
  findById(tx: Prisma.TransactionClient, id: string): Promise<User | null>
  findByEmail(tx: Prisma.TransactionClient, email: string): Promise<User | null>
  save(tx: Prisma.TransactionClient, user: User): Promise<void>
  delete(tx: Prisma.TransactionClient, id: string): Promise<void>
  findAll(tx: Prisma.TransactionClient): Promise<User[]>
}