import { Link } from '@tanstack/react-router';
import { useVideoList } from '../features/videos/hooks/useVideoList';
import { VideoTable } from '../features/videos/components/VideoTable';

export function VideoListPage() {
  const { videos, isLoading, deleteVideo } = useVideoList();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Videos</h1>
        <Link
          to="/videos/upload"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Upload Video
        </Link>
      </div>
      <VideoTable videos={videos} isLoading={isLoading} onDelete={deleteVideo} />
    </div>
  );
}