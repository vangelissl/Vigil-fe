import { VideoUploader } from "../features/videos/components/VideoUploader";

export function VideoUploadPage() {
	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold mb-8">Upload Video</h1>
			<div className="w-full max-w-2xl">
				<VideoUploader />
			</div>
		</div>
	);
}
