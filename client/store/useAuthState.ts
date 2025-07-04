import { useEffect, useState } from 'react';
import type { IdToken } from 'types/brandedId';

export type AuthTokens = {
  provider: 'cognito';
  idToken: IdToken;
  accessToken: string;
  refreshToken: string;
};

export type AuthState = {
  isAuthorized: boolean;
  tokens: AuthTokens | null;
};

export const useAuthState = () => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthorized: false,
    tokens: null,
  });
  const [authInited, setAuthInited] = useState(false);

  useEffect(() => {
    // ここで実際のCognito認証状態を確認する処理を実装
    // 今は仮実装
    setAuthInited(true);
  }, []);

  const setAuthTokens = (tokens: AuthTokens) => {
    setAuth({
      isAuthorized: true,
      tokens,
    });
  };

  const clearAuth = () => {
    setAuth({
      isAuthorized: false,
      tokens: null,
    });
  };

  return {
    auth,
    authInited,
    setAuthTokens,
    clearAuth,
  };
};
