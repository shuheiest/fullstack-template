import { ErrorDisplay } from './components/ErrorDisplay';
import { SignUpButton } from './components/SignUpButton';
import { SignUpFormFields } from './components/SignUpFormFields';
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
    <main className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="w-full max-w-md p-8">
        <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-600 p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">アカウントを作成</h2>
            <p className="text-gray-400">新しいアカウントを作成してください</p>
          </div>
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
