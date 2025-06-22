import type { User } from '@/domain/schemas/UserSchema';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    query?: {
      limit?: number;
      offset?: number;
    };
    resBody: User[];
  };
  post: {
    reqBody: {
      email: string;
      name: string;
    };
    resBody: User;
  };
}>;
