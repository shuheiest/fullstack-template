'use client';

export const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-xl">
        <div className="flex flex-col items-center">
          <div className="flex justify-center" aria-label="読み込み中">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
          </div>
          <p className="mt-4 text-gray-700">読み込み中...</p>
        </div>
      </div>
    </div>
  );
};
