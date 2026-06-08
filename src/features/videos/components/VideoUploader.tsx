import { useState } from 'react';
import { useVideoUpload } from '../hooks/useVideoUpload';
import { ALLOWED_EXTENSIONS } from '../utils/validation';

export function VideoUploader() {
  const [dragActive, setDragActive] = useState(false);
  const { mutate: upload, isPending } = useVideoUpload();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      alert('Invalid file type. Only MP4, AVI, and MOV are allowed');
      return;
    }
    if (file.size > 1_000_000_000) {
      alert('File must be less than 1GB');
      return;
    }
    upload(file);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
        dragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={ALLOWED_EXTENSIONS.map((ext) => `video/${ext.slice(1)}`).join(',')}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        disabled={isPending}
        className="hidden"
        id="file-input"
      />
      <label htmlFor="file-input" className="cursor-pointer block">
        <div className="text-gray-600">
          {isPending ? (
            <>
              <p className="font-medium">Uploading...</p>
              <p className="text-sm">Please wait...</p>
            </>
          ) : (
            <>
              <p className="font-medium">Drag and drop your video here</p>
              <p className="text-sm text-gray-500">or click to select a file</p>
              <p className="text-xs text-gray-400 mt-2">
                Supported: MP4, AVI, MOV (max 1GB)
              </p>
            </>
          )}
        </div>
      </label>
    </div>
  );
}