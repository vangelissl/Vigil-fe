export interface Video {
  id: string;
  filename: string;
  size_bytes: number;
  status: 'UPLOADED' | 'READY' | 'PROCESSING' | 'FAILED';
  created_at: string;
  owner_id: string;
}

export interface VideoUploadResponse {
  id: string;
  filename: string;
  size_bytes: number;
  status: string;
}