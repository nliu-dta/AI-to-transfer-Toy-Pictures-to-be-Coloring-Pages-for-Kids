import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, Camera } from 'lucide-react';

interface UploadZoneProps {
  onImageSelected: (file: File) => void;
  isProcessing: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onImageSelected, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (isProcessing) return;

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
          onImageSelected(file);
        } else {
          alert('Please upload an image file (JPG, PNG).');
        }
      }
    },
    [onImageSelected, isProcessing]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        onImageSelected(e.target.files[0]);
      }
    },
    [onImageSelected]
  );

  return (
    <div
      className={`
        relative w-full max-w-2xl mx-auto rounded-3xl border-4 border-dashed transition-all duration-300 ease-in-out
        flex flex-col items-center justify-center p-12 text-center cursor-pointer group bg-white
        ${
          isDragging
            ? 'border-crayon-blue bg-blue-50 scale-[1.02]'
            : 'border-gray-200 hover:border-crayon-blue hover:bg-gray-50'
        }
        ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isProcessing}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />

      <div className="bg-crayon-red/10 p-6 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
        <Camera className="w-12 h-12 text-crayon-red" />
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-2 fun-font">
        Drop a toy picture here!
      </h3>
      <p className="text-gray-500 mb-6 max-w-md">
        Take a photo of a toy, doll, or action figure, and we'll turn it into a coloring page.
      </p>

      <button
        type="button"
        disabled={isProcessing}
        className="bg-crayon-dark text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-colors shadow-lg"
      >
        <Upload className="w-5 h-5" />
        Choose Photo
      </button>
    </div>
  );
};

export default UploadZone;
