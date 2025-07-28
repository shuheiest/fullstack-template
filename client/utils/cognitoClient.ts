// フロントエンド用Cognitoクライアント（関数型）
import { Amplify } from 'aws-amplify';
import {
  confirmSignUp,
  fetchUserAttributes,
  getCurrentUser,
  resendSignUpCode,
  signIn,
  signOut,
  signUp,
} from 'aws-amplify/auth';
import type { AuthToken, ConfirmSignUpRequest, SignInRequest, SignUpRequest } from 'types/auth';
import { cognitoClientId, cognitoEndpoint, cognitoPoolId } from './envValues';

// Amplify設定
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: cognitoPoolId,
      userPoolClientId: cognitoClientId,
      userPoolEndpoint: cognitoEndpoint,
    },
  },
});

// サインアップ関数
export const amplifySignUp = async (
  request: SignUpRequest,
): Promise<{ userSub?: string; userConfirmed: boolean; message: string }> => {
  return signUp({
    username: request.email,
    password: request.password,
    options: {
      userAttributes: {
        email: request.email,
      },
    },
  }).then((result) => ({
    userSub: result.userId,
    userConfirmed: result.isSignUpComplete,
    message: 'アカウントが作成されました。確認コードがメールに送信されました。',
  }));
};

// サインアップ確認関数
export const amplifyConfirmSignUp = async (
  request: ConfirmSignUpRequest,
): Promise<{ message: string }> => {
  return confirmSignUp({
    username: request.email,
    confirmationCode: request.confirmationCode,
  }).then(() => ({
    message: 'メール認証が完了しました。ログインできます。',
  }));
};

// 確認コード再送関数
export const resendConfirmationCode = async (email: string): Promise<{ message: string }> => {
  return resendSignUpCode({
    username: email,
  }).then(() => ({
    message: '確認コードを再送信しました。メールをご確認ください。',
  }));
};

// サインイン関数（SRP認証自動使用）
export const amplifySignIn = async (
  request: SignInRequest,
): Promise<AuthToken & { isEmailVerified: boolean }> => {
  return signIn({
    username: request.email,
    password: request.password,
  }).then(async (result) => {
    if (!result.isSignedIn) {
      throw new Error('ログインに失敗しました。');
    }

    // ユーザー属性を取得してメール認証状態をチェック
    const userAttributes = await fetchUserAttributes();
    const isEmailVerified = userAttributes.email_verified === 'true';

    return {
      provider: 'cognito' as const,
      accessToken: '', // TODO: 実際のトークン取得方法を調整
      idToken: '', // TODO: 実際のトークン取得方法を調整
      refreshToken: '', // TODO: 実際のトークン取得方法を調整
      expiresIn: 3600, // 1時間（デフォルト）
      isEmailVerified,
    };
  });
};

// トークンをローカルストレージに保存する関数
export const saveTokens = (tokens: AuthToken) => {
  localStorage.setItem('authTokens', JSON.stringify(tokens));
};

// トークンをローカルストレージから取得する関数
export const getTokens = (): AuthToken | null => {
  const stored = localStorage.getItem('authTokens');
  return stored !== null ? JSON.parse(stored) : null;
};

// トークンをローカルストレージから削除する関数
export const clearTokens = () => {
  localStorage.removeItem('authTokens');
};

// トークンの有効性をチェックする関数
export const isTokenValid = (token: AuthToken): boolean => {
  const now = Math.floor(Date.now() / 1000);
  return now < token.expiresIn;
};

// 現在のログイン状態をチェックする関数
export const getCurrentAuthUser = async () => {
  const user = await getCurrentUser();

  if (user === null) return;

  return user;
};

// ログアウト関数
export const amplifySignOut = async () => {
  await signOut();
  clearTokens();
};
