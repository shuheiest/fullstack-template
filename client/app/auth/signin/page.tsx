'use client';

import type { AuthToken } from 'api/@types/auth';
import { useAuthHeader } from 'hooks/useAuthHeader';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from 'store/useAuthState';
import { useLoadingState } from 'store/useLoadingState';
import { useUserOrAnonymousState } from 'store/useUserOrAnonymousState';
import { apiClient } from 'utils/apiClient';
import { amplifySignIn } from 'utils/cognitoClient';
import { idTokenParser } from 'utils/parser';
import { SignInForm } from './SignInForm';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const { headers } = useAuthHeader();
  const { setAuthTokens, authInited } = useAuthState();
  const { setUserOrAnonymous } = useUserOrAnonymousState();
  const { loading, setLoading } = useLoadingState();

  // URLパラメータから成功メッセージを取得
  useEffect(() => {
    const message = searchParams.get('message');
    if (message === 'confirmed') {
      setSuccessMessage('アカウント確認が完了しました。ログインしてください。');
    }
  }, [searchParams]);

  // ユーザー同期処理
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
      });
    setLoading(false);
  }, [headers, authInited, setUserOrAnonymous, router, setLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    amplifySignIn({ email, password })
      .then((result: AuthToken & { isEmailVerified: boolean }) => {
        console.log('ログイン成功:', result);

        // メール未認証の場合は確認画面にリダイレクト
        if (!result.isEmailVerified) {
          setError('メール認証が完了していません。確認コードを入力してください。');
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
        setError(err.message || 'ログインに失敗しました');
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
      onSubmit={handleSubmit}
    />
  );
};

export default SignInPage;
