import type { SignUpRequest } from 'api/@types/auth';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqBody: SignUpRequest;
    resBody: {
      message: string;
      success: boolean;
    };
  };
}>;
