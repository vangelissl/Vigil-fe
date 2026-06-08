import { type Video } from '../types';
import { formatBytes, formatDate } from '../../../shared/utils/format';
import { Link } from '@tanstack/react-router';

interface VideoCardProps {
  video: Video;
  onDelete: (id: string) => void;
}

export function VideoCard({ video, onDelete }: VideoCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <h3 className="font-semibold truncate">{video.filename}</h3>
      <p className="text-sm text-gray-600">{formatBytes(video.size_bytes)}</p>
      <p className="text-sm text-gray-600">{formatDate(video.created_at)}</p>
      
      <div className="flex gap-2 mt-4">
        <Link
          to={`/videos/$videoId`}
          params={{ videoId: video.id }}
          className="flex-1 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700"
        >
          View
        </Link>
        <button
          onClick={() => onDelete(video.id)}
          className="flex-1 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}