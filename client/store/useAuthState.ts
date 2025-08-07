import type { AuthSession } from 'aws-amplify/auth';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

export type AuthState = {
  isAuthorized: boolean;
  session: AuthSession | null;
};

export const useAuthState = () => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthorized: false,
    session: null,
  });
  const [authInited, setAuthInited] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const session = await fetchAuthSession();

      if (!session?.tokens?.accessToken || !session?.tokens?.idToken) {
        setAuth({ isAuthorized: false, session: null });
        setAuthInited(true);
        return;
      }

      setAuth({ isAuthorized: true, session });
      setAuthInited(true);
    };

    void initializeAuth();
  }, []);

  const setAuthSession = (session: AuthSession) => {
    setAuth({
      isAuthorized: true,
      session,
    });
  };

  const clearAuth = () => {
    setAuth({
      isAuthorized: false,
      session: null,
    });
  };

  return {
    auth,
    authInited,
    setAuthSession,
    clearAuth,
  };
};
