interface AnalysisStatusBadgeProps {
  status: string;
}

export function AnalysisStatusBadge({ status }: AnalysisStatusBadgeProps) {
  const getColor = () => {
    switch (status) {
      case 'PENDING':
        return 'bg-gray-100 text-gray-800';
      case 'PROCESSING':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'PENDING':
        return '⏳';
      case 'PROCESSING':
        return '⚙️';
      case 'COMPLETED':
        return '✓';
      case 'FAILED':
        return '✗';
      default:
        return '';
    }
  };

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getColor()}`}>
      <span>{getIcon()}</span>
      {status}
    </span>
  );
}