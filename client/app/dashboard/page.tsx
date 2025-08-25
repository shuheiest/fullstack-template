const Dashboard = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-sm p-8 text-center border border-gray-600">
        <div className="w-14 h-14 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">メインコンテンツ</h1>
        <p className="text-gray-400 max-w-md mx-auto mb-6">
          ここにアプリケーションのメイン機能を実装できます。
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
