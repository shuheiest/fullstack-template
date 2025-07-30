type MessageDisplayProps = {
  successMessage?: string;
  error?: string;
};

export const MessageDisplay = ({ successMessage, error }: MessageDisplayProps) => {
  return (
    <>
      {successMessage !== undefined && (
        <div className="bg-green-900/20 border border-green-600/30 rounded p-3">
          <p className="text-sm text-green-400">{successMessage}</p>
        </div>
      )}

      {error !== undefined && (
        <div className="bg-red-900/20 border border-red-600/30 rounded p-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
    </>
  );
};
