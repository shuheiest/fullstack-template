'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { amplifyConfirmSignUp, amplifySignUp, resendConfirmationCode } from 'utils/cognitoClient';
import { messages } from 'utils/messages';
import { ConfirmStep } from './ConfirmStep';
import { SignUpForm } from './SignUpForm';

const SignUpPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<'signup' | 'confirm'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    amplifySignUp({ email, password, username: email })
      .then((result: { userSub?: string; message: string }) => {
        setStep('confirm');
        console.log('サインアップ成功:', result.message);
      })
      .catch((err: Error) => {
        setError(err.message || messages.auth.signupFailed);
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

    amplifyConfirmSignUp({ email, confirmationCode })
      .then(() => {
        router.push('/auth/signin?message=confirmed');
      })
      .catch((err: Error) => {
        setError(err.message || messages.auth.confirmFailed);
      });
    setIsLoading(false);
  };

  const handleResendCode = () => {
    setIsLoading(true);
    setError('');

    resendConfirmationCode(email)
      .then(() => {
        setError('');
      })
      .catch((err: Error) => {
        setError(err.message || messages.auth.resendFailed);
      });
    setIsLoading(false);
  };

  const stepComponents = {
    signup: (
      <SignUpForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        isLoading={isLoading}
        error={error}
        onSubmit={handleSignUp}
      />
    ),
    confirm: (
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
    ),
  };

  return stepComponents[step];
};

export default SignUpPage;
