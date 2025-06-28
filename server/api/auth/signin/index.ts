import type { AuthToken, SignInRequest } from 'api/@types/auth';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqBody: SignInRequest;
    resBody: {
      message: string;
      success: boolean;
      tokens?: AuthToken;
    };
  };
}>;
