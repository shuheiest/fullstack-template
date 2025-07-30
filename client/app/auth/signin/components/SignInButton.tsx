import Link from 'next/link';

type SignInButtonProps = {
  isLoading: boolean;
  onClick: () => void;
};

export const SignInButton = ({ isLoading, onClick }: SignInButtonProps) => {
  return (
    <>
      <button
        type="submit"
        disabled={isLoading}
        onClick={onClick}
        className="w-full flex justify-center items-center py-2.5 px-4 rounded font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            ログイン中...
          </>
        ) : (
          'ログイン'
        )}
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-800 text-gray-400">または</span>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/auth/signup"
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          アカウントを作成
        </Link>
      </div>
    </>
  );
};
