export interface ClassificationResult {
  predicted_class: string;
  confidence: number;
  all_scores: Record<string, number>;
}

export interface Analysis {
  id: string;
  video_id: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  classification_result: ClassificationResult | null;
  created_at: string;
  completed_at: string | null;
}