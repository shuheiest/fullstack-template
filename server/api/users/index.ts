import type { DefineMethods } from 'aspida'
import type { User } from '@/domain/schemas/UserSchema'

export type Methods = DefineMethods<{
  get: {
    query?: {
      limit?: number
      offset?: number
    }
    resBody: User[]
  }
  post: {
    reqBody: {
      email: string
      name: string
    }
    resBody: User
  }
}>
