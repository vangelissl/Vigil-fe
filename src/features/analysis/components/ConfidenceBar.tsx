interface ConfidenceBarProps {
  confidence: number;
  label?: string;
}

export function ConfidenceBar({ confidence, label }: ConfidenceBarProps) {
  const percentage = Math.round(confidence * 100);

  const getColor = () => {
    if (confidence < 0.5) return 'bg-red-500';
    if (confidence < 0.8) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div>
      {label && <p className="text-sm font-medium mb-1">{label}</p>}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-1">{percentage}%</p>
    </div>
  );
}