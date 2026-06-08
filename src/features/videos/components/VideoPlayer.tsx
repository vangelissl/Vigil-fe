import { useEffect, useState } from 'react';
import { videosAPI } from '../api/videos.api';

interface VideoPlayerProps {
  videoId: string;
}

export function VideoPlayer({ videoId }: VideoPlayerProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        setIsLoading(true);
        const url = await videosAPI.getDownloadUrl(videoId);
        setVideoUrl(url);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to load video');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUrl();
  }, [videoId]);

  if (isLoading) {
    return <div className="aspect-video bg-gray-200 flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="aspect-video bg-gray-200 flex items-center justify-center text-red-600">{error}</div>;
  }

  return (
    <video
      src={videoUrl || undefined}
      controls
      className="w-full aspect-video bg-black rounded"
    />
  );
}