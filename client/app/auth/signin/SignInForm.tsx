import { MessageDisplay } from './components/MessageDisplay';
import { SignInButton } from './components/SignInButton';
import { SignInFormFields } from './components/SignInFormFields';
import { SignInHeader } from './components/SignInHeader';

type SignInFormProps = {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  isLoading: boolean;
  error: string;
  successMessage: string;
  onSubmit: (e: React.FormEvent) => void;
};

export const SignInForm = ({
  email,
  password,
  setEmail,
  setPassword,
  isLoading,
  error,
  successMessage,
  onSubmit,
}: SignInFormProps) => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <SignInHeader />
          <form className="space-y-6" onSubmit={onSubmit}>
            <MessageDisplay successMessage={successMessage} error={error} />
            <SignInFormFields
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
            />
            <SignInButton isLoading={isLoading} />
          </form>
        </div>
      </div>
    </main>
  );
};
