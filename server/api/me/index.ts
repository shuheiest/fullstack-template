import type { DefineMethods } from 'aspida';
import type { AuthHeader, AuthenticatedUser } from '../@types/jwt';

export type Methods = DefineMethods<{
  get: {
    reqHeaders: AuthHeader;
    resBody: AuthenticatedUser;
  };
}>;