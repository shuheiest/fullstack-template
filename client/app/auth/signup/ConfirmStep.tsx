import { ErrorDisplay } from './components/ErrorDisplay';

interface ConfirmStepProps {
  email: string;
  confirmationCode: string;
  setConfirmationCode: (code: string) => void;
  isLoading: boolean;
  error?: string;
  onConfirm: (e: React.FormEvent) => void;
  onBack: () => void;
  onResend: () => void;
}

export const ConfirmStep = ({
  email,
  confirmationCode,
  setConfirmationCode,
  isLoading,
  error,
  onConfirm,
  onBack,
  onResend,
}: ConfirmStepProps) => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">メール確認</h2>
            <p className="text-gray-600 mb-2">確認コードを入力してください</p>
            <p className="text-sm text-purple-600 font-medium bg-purple-50 px-3 py-2 rounded-lg">
              {email}
            </p>
          </div>

          <form className="space-y-6" onSubmit={onConfirm}>
            <ErrorDisplay error={error} />

            <div>
              <label
                htmlFor="confirmationCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                確認コード
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2v6m0 0a2 2 0 01-2 2m2-2h-6m6 0v-6m-6 0a2 2 0 00-2-2m2 2h6m-6 0v6"
                    />
                  </svg>
                </div>
                <input
                  id="confirmationCode"
                  name="confirmationCode"
                  type="text"
                  required
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 text-center text-lg font-mono tracking-widest"
                  placeholder="123456"
                  maxLength={6}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 text-center">
                メールに送信された6桁のコードを入力してください
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-white font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
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
                  確認中...
                </>
              ) : (
                'アカウントを確認'
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">確認コードが届かない場合</span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                type="button"
                onClick={onResend}
                disabled={isLoading}
                className="inline-flex items-center justify-center text-purple-600 hover:text-purple-700 font-medium disabled:opacity-50 transition duration-200 py-2 px-4 rounded-lg hover:bg-purple-50"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                確認コードを再送信
              </button>

              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center justify-center text-gray-600 hover:text-gray-700 font-medium transition duration-200 py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                戻る
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
