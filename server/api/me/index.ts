import type { DefineMethods } from 'aspida';
import type { AuthHeader } from '../@types/jwt';
import type { UserOrAnonymousDto } from '../@types/user';

export type Methods = DefineMethods<{
  get: {
    reqHeaders: AuthHeader;
    resBody: UserOrAnonymousDto;
  };
}>;
