
import React, { useRef, useState } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, dragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  return (
    <div 
      className={`w-full max-w-xl p-8 border-4 border-dashed rounded-3xl text-center cursor-pointer transition-all duration-300 ${
        isDragging ? 'border-purple-600 bg-purple-100 scale-105' : 'border-gray-300 bg-white/50 hover:border-purple-400 hover:bg-purple-50'
      }`}
      onClick={handleClick}
      onDragEnter={(e) => handleDragEvents(e, true)}
      onDragLeave={(e) => handleDragEvents(e, false)}
      onDragOver={(e) => handleDragEvents(e, true)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      <div className="flex flex-col items-center justify-center space-y-4 text-gray-500">
        <UploadIcon className="w-16 h-16 text-purple-400" />
        <p className="text-xl font-semibold">
          <span className="text-purple-600">Click to upload</span> or drag and drop
        </p>
        <p className="text-sm">PNG, JPG, or WEBP</p>
      </div>
    </div>
  );
};

export default ImageUploader;
