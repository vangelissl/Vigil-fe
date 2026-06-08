import { useParams } from '@tanstack/react-router';
import { useVideoDetail } from '../features/videos/hooks/useVideoDetails';
import { VideoPlayer } from '../features/videos/components/VideoPlayer';
import { useTriggerAnalysis } from '../features/analysis/hooks/useAnalysis';
import { formatBytes, formatDate } from '../shared/utils/format';

export function VideoDetailPage() {
  const { videoId } = useParams({ from: '/videos/$videoId' });
  const { data: video, isLoading } = useVideoDetail(videoId);
  const { mutate: triggerAnalysis, isPending } = useTriggerAnalysis();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{video.filename}</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <VideoPlayer videoId={videoId} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-600">Size</p>
          <p className="text-lg font-semibold">{formatBytes(video.size_bytes)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Status</p>
          <p className="text-lg font-semibold">{video.status}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Uploaded</p>
          <p className="text-lg font-semibold">{formatDate(video.created_at)}</p>
        </div>
      </div>

      <button
        onClick={() => triggerAnalysis(videoId)}
        disabled={isPending}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {isPending ? 'Starting...' : 'Analyze Video'}
      </button>
    </div>
  );
}