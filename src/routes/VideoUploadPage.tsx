import { VideoUploader } from '../features/videos/components/VideoUploader';

export function VideoUploadPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Upload Video</h1>
      <div className="max-w-2xl">
        <VideoUploader />
      </div>
    </div>
  );
}