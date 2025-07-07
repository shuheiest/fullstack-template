export const SignInHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">おかえりなさい</h2>
      <p className="text-gray-600">アカウントにログインしてください</p>
    </div>
  );
};
