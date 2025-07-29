'use client';

import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">メインコンテンツ</h1>
              <p className="text-gray-600">
                ここにアプリケーションのメイン機能を実装できます。
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
