const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-sm p-8 border border-gray-600">
        <h1 className="text-2xl font-bold text-white mb-6">設定</h1>
        <div className="space-y-6">
          <div className="border-b border-gray-600 pb-4">
            <h2 className="text-lg font-semibold text-white mb-2">アカウント設定</h2>
            <p className="text-gray-400">アカウント情報の変更や管理を行います。</p>
          </div>
          <div className="border-b border-gray-600 pb-4">
            <h2 className="text-lg font-semibold text-white mb-2">通知設定</h2>
            <p className="text-gray-400">通知の受信設定を管理します。</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">プライバシー設定</h2>
            <p className="text-gray-400">データの取り扱いやプライバシー関連の設定を行います。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
