export const SignUpHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl mx-auto mb-4 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
      <h2 className="text-3xl font-semibold text-slate-800 mb-2">新規登録</h2>
      <p className="text-slate-600">アカウントを作成してください</p>
    </div>
  );
};
