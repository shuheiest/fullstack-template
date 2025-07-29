'use client';

import { amplifySignOut } from '../../utils/cognitoClient';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await amplifySignOut();
    router.push('/auth/signin');
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              ダッシュボード
            </h1>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors border border-gray-300"
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};