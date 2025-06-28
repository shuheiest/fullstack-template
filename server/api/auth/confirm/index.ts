import type { ConfirmSignUpRequest } from 'api/@types/auth';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqBody: ConfirmSignUpRequest;
    resBody: {
      message: string;
      success: boolean;
    };
  };
}>;
