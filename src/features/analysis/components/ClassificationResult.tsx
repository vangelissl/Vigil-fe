import { type ClassificationResult } from '../types';
import { ConfidenceBar } from './ConfidenceBar';

interface ClassificationResultProps {
  result: ClassificationResult;
}

export function ClassificationResultComponent({ result }: ClassificationResultProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Prediction</h3>
        <p className="text-3xl font-bold text-blue-600 capitalize">
          {result.predicted_class}
        </p>
      </div>

      <div>
        <ConfidenceBar confidence={result.confidence} label="Confidence" />
      </div>

      <div>
        <h4 className="font-semibold mb-3">Per-Class Scores</h4>
        <div className="space-y-3">
          {Object.entries(result.all_scores).map(([className, score]) => (
            <div key={className}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium capitalize">{className}</span>
                <span className="text-sm text-gray-600">{Math.round(score * 100)}%</span>
              </div>
              <ConfidenceBar confidence={score} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}