import { useMemo } from 'react';
import { useAuthState } from 'store/useAuthState';
import { genAuthHeader } from 'utils/genAuthHeader';

export const useAuthHeader = () => {
  const { auth } = useAuthState();

  const headers = useMemo(
    () =>
      auth.isAuthorized && auth.tokens && auth.tokens.provider === 'cognito'
        ? genAuthHeader(auth.tokens.idToken)
        : null,
    [auth],
  );

  return { headers };
};
