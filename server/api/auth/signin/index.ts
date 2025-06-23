import type { AuthToken, SignInRequest } from '@/domain/schemas/AuthSchema';
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
