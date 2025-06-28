interface ConfirmStepProps {
  email: string;
  confirmationCode: string;
  setConfirmationCode: (code: string) => void;
  isLoading: boolean;
  error: string;
  onConfirm: (e: React.FormEvent) => void;
  onBack: () => void;
}

export default function ConfirmStep({
  email,
  confirmationCode,
  setConfirmationCode,
  isLoading,
  error,
  onConfirm,
  onBack,
}: ConfirmStepProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">アカウント確認</h2>
          <p className="mt-2 text-sm text-gray-600">
            {email} に送信された確認コードを入力してください
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onConfirm}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="confirmationCode" className="block text-sm font-medium text-gray-700">
              確認コード
            </label>
            <input
              id="confirmationCode"
              name="confirmationCode"
              type="text"
              required
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="確認コード"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '確認中...' : 'アカウントを確認'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onBack}
              className="text-indigo-600 hover:text-indigo-500 text-sm"
            >
              戻る
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
