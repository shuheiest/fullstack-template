'use client';

import { AuthGuard } from '../../components/auth/AuthGuard';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-700">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 bg-gray-700">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
