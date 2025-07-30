import { messages } from 'utils/messages';
import { ErrorDisplay } from './components/ErrorDisplay';

interface ConfirmStepProps {
  email: string;
  confirmationCode: string;
  setConfirmationCode: (code: string) => void;
  isLoading: boolean;
  error: string;
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
    <main className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="w-full max-w-md p-8">
        <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-600 p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">メール確認</h2>
            <p className="text-gray-400 mb-2">確認コードを入力してください</p>
            <p className="text-sm text-indigo-400 font-medium bg-gray-700 px-3 py-2 rounded">
              {email}
            </p>
          </div>

          <form className="space-y-6" onSubmit={onConfirm}>
            <ErrorDisplay error={error} />

            <div>
              <label
                htmlFor="confirmationCode"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                確認コード
              </label>
              <input
                id="confirmationCode"
                name="confirmationCode"
                type="text"
                required
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                className="block w-full px-3 py-2.5 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-center text-lg font-mono tracking-widest"
                placeholder="123456"
                maxLength={6}
              />
              <p className="mt-2 text-xs text-gray-400 text-center">
                メールに送信された6桁のコードを入力してください
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
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
                  {messages.common.loading}
                </>
              ) : (
                messages.common.confirm
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">確認コードが届かない場合</span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                type="button"
                onClick={onResend}
                disabled={isLoading}
                className="inline-flex items-center justify-center text-indigo-400 hover:text-indigo-300 font-medium disabled:opacity-50 transition-colors py-2 px-4 rounded hover:bg-gray-700"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {messages.auth.resendCode}
              </button>

              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center justify-center text-gray-400 hover:text-gray-300 font-medium transition-colors py-2 px-4 rounded hover:bg-gray-700"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                {messages.common.back}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
