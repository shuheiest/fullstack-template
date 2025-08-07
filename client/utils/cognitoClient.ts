// フロントエンド用Cognitoクライアント（関数型）
import { Amplify } from 'aws-amplify';
import type { AuthSession } from 'aws-amplify/auth';
import {
  confirmSignUp,
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
  resendSignUpCode,
  signIn,
  signOut,
  signUp,
} from 'aws-amplify/auth';
import type { ConfirmSignUpRequest, SignInRequest, SignUpRequest } from 'types/auth';
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
): Promise<AuthSession & { isEmailVerified: boolean }> => {
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

    // 認証セッションを取得
    const session = await fetchAuthSession();

    if (!session.tokens?.accessToken || !session.tokens?.idToken) {
      throw new Error('認証トークンの取得に失敗しました。');
    }

    return {
      ...session,
      isEmailVerified,
    };
  });
};

// セッションをローカルストレージに保存する関数
export const saveAuthSession = (session: AuthSession) => {
  localStorage.setItem('authSession', JSON.stringify(session));
};

// セッションをローカルストレージから取得する関数
export const getAuthSession = (): AuthSession | null => {
  const stored = localStorage.getItem('authSession');
  return stored !== null ? JSON.parse(stored) : null;
};

// セッションをローカルストレージから削除する関数
export const clearAuthSession = () => {
  localStorage.removeItem('authSession');
};

// セッションの有効性をチェックする関数
export const isSessionValid = (session: AuthSession): boolean => {
  const exp = session.tokens?.accessToken?.payload?.exp;
  if (exp === undefined) return false;

  const now = Math.floor(Date.now() / 1000);
  return now < exp;
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
  clearAuthSession();
};
