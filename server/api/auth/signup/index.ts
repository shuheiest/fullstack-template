import type { SignUpRequest } from '@/domain/schemas/AuthSchema';
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
