import type { ConfirmSignUpRequest } from '@/domain/schemas/AuthSchema';
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
