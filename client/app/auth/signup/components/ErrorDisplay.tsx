type ErrorDisplayProps = {
  error: string;
};

export const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  if (error === '') return;

  return (
    <div className="bg-red-900/20 border border-red-600/30 rounded p-3">
      <p className="text-sm text-red-400">{error}</p>
    </div>
  );
};
