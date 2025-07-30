'use client';

import { useRouter } from 'next/navigation';
import { amplifySignOut } from '../../utils/cognitoClient';

export const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await amplifySignOut();
    router.push('/auth/signin');
  };

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="px-6">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg font-semibold text-white">ダッシュボード</h1>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 hover:text-white rounded transition-colors"
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
