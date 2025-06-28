import type {
  AuthToken,
  ConfirmSignUpRequest,
  SignInRequest,
  SignUpRequest,
} from '@/domain/schemas/AuthSchema';
import {
  validateConfirmSignUp,
  validateSignIn,
  validateSignUp,
} from '@/domain/validators/AuthValidator';

// 認証関連のユースケース

export const authUsecase = {
  signUp: async (data: SignUpRequest): Promise<{ message: string; success: boolean }> => {
    // ドメインバリデーション
    if (!validateSignUp(data)) {
      throw new Error('Invalid signup data');
    }

    // TODO: magnito APIとの連携実装
    // const magnitoResponse = await fetch('http://localhost:5050/auth/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });

    return {
      message: 'Sign up initiated. Please check your email for confirmation code.',
      success: true,
    };
  },

  signIn: async (
    data: SignInRequest,
  ): Promise<{ message: string; success: boolean; tokens: AuthToken }> => {
    // ドメインバリデーション
    if (!validateSignIn(data)) {
      throw new Error('Invalid signin data');
    }

    // TODO: magnito APIとの連携実装
    // const magnitoResponse = await fetch('http://localhost:5050/auth/signin', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });

    return {
      message: 'Sign in successful',
      success: true,
      tokens: {
        provider: 'cognito' as const,
        accessToken: 'mock-access-token',
        idToken: 'mock-id-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
      },
    };
  },

  confirmSignUp: async (
    data: ConfirmSignUpRequest,
  ): Promise<{ message: string; success: boolean }> => {
    // ドメインバリデーション
    if (!validateConfirmSignUp(data)) {
      throw new Error('Invalid confirmation data');
    }

    // TODO: magnito APIとの連携実装
    // const magnitoResponse = await fetch('http://localhost:5050/auth/confirm', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });

    return {
      message: 'Email verification successful. You can now sign in.',
      success: true,
    };
  },
};
