import { ErrorDisplay } from './components/ErrorDisplay';
import { SignUpButton } from './components/SignUpButton';
import { SignUpFormFields } from './components/SignUpFormFields';
import { SignUpHeader } from './components/SignUpHeader';
import type { SignUpFormProps } from './types';

export const SignUpForm = ({
  email,
  password,
  setEmail,
  setPassword,
  isLoading,
  error,
  onSubmit,
}: SignUpFormProps) => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-slate-700">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-8">
          <SignUpHeader />
          <form className="space-y-6" onSubmit={onSubmit}>
            <ErrorDisplay error={error} />
            <SignUpFormFields
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
            />
            <SignUpButton isLoading={isLoading} />
          </form>
        </div>
      </div>
    </main>
  );
};
