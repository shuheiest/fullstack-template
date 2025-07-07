'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { confirmSignUp, resendConfirmationCode, signUp } from 'utils/cognitoClient';
import ConfirmStep from './ConfirmStep';
import { SignUpForm } from './SignUpForm';

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<'signup' | 'confirm'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    signUp({ email, password, username: email })
      .then((result: { userSub?: string; message: string }) => {
        setStep('confirm');
        console.log('サインアップ成功:', result.message);
      })
      .catch((err: Error) => {
        setError(err.message || 'サインアップに失敗しました');
        console.error('サインアップエラー:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleConfirmSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    confirmSignUp({ email, confirmationCode })
      .then((result: { message: string }) => {
        console.log('アカウント確認成功:', result.message);
        router.push('/auth/signin?message=confirmed');
      })
      .catch((err: Error) => {
        setError(err.message || 'アカウント確認に失敗しました');
        console.error('確認エラー:', err);
      });
    setIsLoading(false);
  };

  const handleResendCode = () => {
    setIsLoading(true);
    setError('');

    resendConfirmationCode(email)
      .then((result: { message: string }) => {
        console.log('確認コード再送信成功:', result.message);
        setError(''); // 成功メッセージは別途表示したい場合
      })
      .catch((err: Error) => {
        setError(err.message || '確認コード再送信に失敗しました');
        console.error('再送信エラー:', err);
      });
    setIsLoading(false);
  };

  if (step === 'confirm') {
    return (
      <ConfirmStep
        email={email}
        confirmationCode={confirmationCode}
        setConfirmationCode={setConfirmationCode}
        isLoading={isLoading}
        error={error}
        onConfirm={handleConfirmSignUp}
        onBack={() => setStep('signup')}
        onResend={handleResendCode}
      />
    );
  }

  return (
    <SignUpForm
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSignUp}
    />
  );
}
