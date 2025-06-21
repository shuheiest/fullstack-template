import type { User } from '../schemas/UserSchema'

export const createUser = (props: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
  const now = new Date()
  return {
    ...props,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  }
}

export const updateUserName = (user: User, name: string): User => {
  return {
    ...user,
    name,
    updatedAt: new Date(),
  }
}

export const updateUserEmail = (user: User, email: string): User => {
  return {
    ...user,
    email,
    updatedAt: new Date(),
  }
}

export const isValidUserName = (name: string): boolean => {
  return name.trim().length > 0 && name.length <= 100
}

export const isValidUserEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}