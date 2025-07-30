'use client';

export const Sidebar = () => {
  return (
    <aside className="w-60 bg-gray-900 min-h-screen">
      <div className="p-4">
        <nav className="space-y-1">
          <a
            href="/dashboard"
            className="flex items-center px-3 py-2 rounded text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 1v6m8-6v6" />
            </svg>
            ダッシュボード
          </a>
        </nav>
      </div>
    </aside>
  );
};
