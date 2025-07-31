'use client';

import { useAuthHeader } from 'hooks/useAuthHeader';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from 'store/useAuthState';
import { useUserOrAnonymousState } from 'store/useUserOrAnonymousState';
import type { AuthToken } from 'types/auth';
import { apiClient } from 'utils/apiClient';
import { amplifySignIn, getCurrentAuthUser } from 'utils/cognitoClient';
import { messages } from 'utils/messages';
import { idTokenParser } from 'utils/parser';
import { SignInForm } from './SignInForm';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { headers } = useAuthHeader();
  const { auth, setAuthTokens, authInited } = useAuthState();
  const { setUserOrAnonymous } = useUserOrAnonymousState();

  useEffect(() => {
    const message = searchParams.get('message');
    if (message === 'confirmed') {
      setSuccessMessage(messages.auth.accountConfirmed);
    }
  }, [searchParams]);

  useEffect(() => {
    getCurrentAuthUser()
      .then((user) => {
        if (user) {
          router.push('/dashboard');
        }
      })
      .catch(() => {});
  }, [router]);

  useEffect(() => {
    if (!headers || !authInited) return;
    setLoading(true);

    apiClient.me
      .$get({ headers })
      .then((user) => {
        setUserOrAnonymous(user);
        router.push(user.role === 'user' ? '/dashboard' : '/');
      })
      .catch((err) => {
        console.error('ユーザー同期エラー:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [headers, authInited, setUserOrAnonymous, router, setLoading]);

  // 認証状態が変わったときのダッシュボード遷移
  useEffect(() => {
    if (auth.isAuthorized && auth.tokens) {
      router.push('/dashboard');
    }
  }, [auth.isAuthorized, auth.tokens, router]);

  const handleLogin = () => {
    setLoading(true);

    amplifySignIn({ email, password })
      .then((result: AuthToken & { isEmailVerified: boolean }) => {
        if (!result.isEmailVerified) {
          setError(messages.auth.emailNotVerified);
          router.push(`/auth/confirm?email=${encodeURIComponent(email)}`);
          return;
        }

        setAuthTokens({
          provider: 'cognito',
          idToken: idTokenParser.parse(result.idToken),
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        });
      })
      .catch((err: Error) => {
        setError(err.message || messages.auth.loginFailed);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SignInForm
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      isLoading={loading}
      error={error}
      successMessage={successMessage}
      onLogin={handleLogin}
    />
  );
};

export default SignInPage;
