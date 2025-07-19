// フロントエンド用Cognitoクライアント（関数型）
import type {
  AuthToken,
  ConfirmSignUpRequest,
  SignInRequest,
  SignUpRequest,
} from 'api/@types/auth';
import { cognitoClientId, cognitoEndpoint } from './envValues';

type CognitoPayload = {
  ClientId: string;
  [key: string]: unknown;
};

// Cognito設定を取得する純粋関数
const getCognitoConfig = () => ({
  endpoint: cognitoEndpoint,
  clientId: cognitoClientId,
});

// Cognito APIリクエストを作成する関数
const createCognitoRequest = (target: string, payload: CognitoPayload) => {
  const config = getCognitoConfig();

  return fetch(`${config.endpoint}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': target,
    },
    body: JSON.stringify(payload),
  });
};

// エラーレスポンスを処理する関数
const handleErrorResponse = (response: Response, text: string) =>
  Promise.reject(
    new Error(`Cognito API error: ${response.status} - ${text || `HTTP ${response.status}`}`),
  );

// 空レスポンスを処理する関数
const handleEmptyResponse = () => Promise.resolve({});

// JSONレスポンスを処理する関数
const handleJsonResponse = (text: string) =>
  Promise.resolve(JSON.parse(text)).catch(() =>
    Promise.reject(new Error(`Invalid JSON response: ${text}`)),
  );

// レスポンスを処理する関数
const handleCognitoResponse = (response: Response) =>
  response
    .text()
    .then((text) =>
      !response.ok
        ? handleErrorResponse(response, text)
        : text.trim() === ''
          ? handleEmptyResponse()
          : handleJsonResponse(text),
    );

// サインアップ関数
export const signUp = async (
  request: SignUpRequest,
): Promise<{ userSub?: string; message: string }> => {
  const config = getCognitoConfig();
  const payload: CognitoPayload = {
    ClientId: config.clientId,
    Username: request.email,
    Password: request.password,
    UserAttributes: [
      {
        Name: 'email',
        Value: request.email,
      },
    ],
  };

  return createCognitoRequest('AWSCognitoIdentityProviderService.SignUp', payload)
    .then(handleCognitoResponse)
    .then((result) => ({
      userSub: result.UserSub,
      message: 'アカウントが作成されました。確認コードがメールに送信されました。',
    }));
};

// サインアップ確認関数
export const confirmSignUp = async (
  request: ConfirmSignUpRequest,
): Promise<{ message: string }> => {
  const config = getCognitoConfig();
  const payload: CognitoPayload = {
    ClientId: config.clientId,
    Username: request.email,
    ConfirmationCode: request.confirmationCode,
  };

  return createCognitoRequest('AWSCognitoIdentityProviderService.ConfirmSignUp', payload)
    .then(handleCognitoResponse)
    .then(() => ({
      message: 'メール認証が完了しました。ログインできます。',
    }));
};

// 確認コード再送関数
export const resendConfirmationCode = async (email: string): Promise<{ message: string }> => {
  const config = getCognitoConfig();
  const payload: CognitoPayload = {
    ClientId: config.clientId,
    Username: email,
  };

  return createCognitoRequest('AWSCognitoIdentityProviderService.ResendConfirmationCode', payload)
    .then(handleCognitoResponse)
    .then(() => ({
      message: '確認コードを再送信しました。メールをご確認ください。',
    }));
};

// サインイン関数
export const signIn = async (request: SignInRequest): Promise<AuthToken> => {
  const config = getCognitoConfig();
  const payload: CognitoPayload = {
    ClientId: config.clientId,
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: request.email,
      PASSWORD: request.password,
    },
  };

  return createCognitoRequest('AWSCognitoIdentityProviderService.InitiateAuth', payload)
    .then(handleCognitoResponse)
    .then((result) => ({
      provider: 'cognito' as const,
      accessToken: result.AuthenticationResult.AccessToken,
      idToken: result.AuthenticationResult.IdToken,
      refreshToken: result.AuthenticationResult.RefreshToken,
      expiresIn: result.AuthenticationResult.ExpiresIn,
    }));
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
