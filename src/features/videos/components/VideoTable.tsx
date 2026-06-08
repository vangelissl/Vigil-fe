import { type Video } from '../types';
import { formatBytes, formatDate } from '../../../shared/utils/format';
import { Link } from '@tanstack/react-router';

interface VideoTableProps {
  videos: Video[] | undefined;
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export function VideoTable({ videos, isLoading, onDelete }: VideoTableProps) {
  if (isLoading) {
    return <div className="text-center py-8">Loading videos...</div>;
  }

  if (!videos || videos.length === 0) {
    return <div className="text-center py-8 text-gray-600">No videos yet</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Filename</th>
            <th className="px-4 py-2 text-left">Size</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Uploaded</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{video.filename}</td>
              <td className="px-4 py-2">{formatBytes(video.size_bytes)}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-sm ${
                  video.status === 'READY' ? 'bg-green-100 text-green-800' :
                  video.status === 'PROCESSING' ? 'bg-yellow-100 text-yellow-800' :
                  video.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {video.status}
                </span>
              </td>
              <td className="px-4 py-2 text-sm text-gray-600">{formatDate(video.created_at)}</td>
              <td className="px-4 py-2 space-x-2">
                <Link
                  to={`/videos/$videoId`}
                  params={{ videoId: video.id }}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
                <button
                  onClick={() => onDelete(video.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}