'use client';

import { getCurrentUser } from '@aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      getCurrentUser()
        .then(() => setIsAuthenticated(true))
        .catch(() => {
          setIsAuthenticated(false);
        });
    };

    void checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-700 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-300">認証状態を確認中...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-700 flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-600 p-8 text-center max-w-md">
          <h2 className="text-xl font-bold text-white mb-2">認証エラー</h2>
          <p className="text-gray-400 mb-6">
            認証情報を確認できませんでした。再ログインしてください。
          </p>
          <button
            onClick={() => router.push('/auth/signin')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-medium transition-colors"
          >
            ログイン画面へ
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
