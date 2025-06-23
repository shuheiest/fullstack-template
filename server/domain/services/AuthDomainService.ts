import { isEmailVerified } from '../entities/Auth';
import type { AuthUser, ConfirmSignUpRequest, SignUpRequest } from '../schemas/AuthSchema';
import { validateConfirmSignUp, validateSignUp } from '../validators/AuthValidator';

// ドメインサービス: エンティティ間の協調やビジネスルール

export const canUserSignUp = (request: SignUpRequest): boolean => validateSignUp(request);

export const canUserSignIn = (authUser: AuthUser): boolean => isEmailVerified(authUser);

export const canUserConfirmSignUp = (request: unknown): boolean =>
  validateConfirmSignUp(request as ConfirmSignUpRequest);
