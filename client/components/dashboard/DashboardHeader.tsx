'use client';

import { useRouter } from 'next/navigation';
import { amplifySignOut } from '../../utils/cognitoClient';

export const DashboardHeader = () => {
  const router = useRouter();

  const handleLogout = () => {
    amplifySignOut().then(() => {
      router.push('/');
    }).catch(() => {
      router.push('/');
    });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">ダッシュボード</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          ログアウト
        </button>
      </div>
    </header>
  );
};