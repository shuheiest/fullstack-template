'use client';

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">メニュー</h2>
        <nav className="space-y-1">
          <a
            href="/dashboard"
            className="block px-3 py-2 rounded-md text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200"
          >
            ダッシュボード
          </a>
        </nav>
      </div>
    </aside>
  );
};