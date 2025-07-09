import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { ImageOptimizer } from '../utils/imageOptimizer';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  maxSizeMB = 5,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp'],
  className = ''
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    setError(null);
    setSuccess(null);
    setProcessing(true);

    try {
      // Validate file type
      if (!acceptedFormats.includes(file.type)) {
        throw new Error(`Please select a valid image file (${acceptedFormats.join(', ')})`);
      }

      let processedFile = file;

      // Check if file needs compression
      if (!ImageOptimizer.isFileSizeAcceptable(file, maxSizeMB)) {
        setSuccess('File too large, compressing...');
        
        // Compress the image
        processedFile = await ImageOptimizer.compressImage(file, 1200, 800, 0.8);
        
        // If still too large, compress more aggressively
        if (!ImageOptimizer.isFileSizeAcceptable(processedFile, maxSizeMB)) {
          processedFile = await ImageOptimizer.compressImage(file, 800, 600, 0.6);
        }

        // Convert to WebP for better compression if still too large
        if (!ImageOptimizer.isFileSizeAcceptable(processedFile, maxSizeMB)) {
          processedFile = await ImageOptimizer.convertToWebP(processedFile, 0.7);
        }

        // Final check
        if (!ImageOptimizer.isFileSizeAcceptable(processedFile, maxSizeMB)) {
          throw new Error(`Image is too large even after compression. Please use a smaller image.`);
        }
      }

      setSuccess(`Image optimized: ${ImageOptimizer.formatFileSize(processedFile.size)}`);
      onImageSelect(processedFile);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image');
    } finally {
      setProcessing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
          dragActive
            ? 'border-orange-500 bg-orange-50'
            : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'
        } ${processing ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="space-y-4">
          {processing ? (
            <Loader className="h-12 w-12 text-orange-500 mx-auto animate-spin" />
          ) : (
            <Upload className="h-12 w-12 text-gray-400 mx-auto" />
          )}
          
          <div>
            <p className="text-lg font-medium text-gray-900">
              {processing ? 'Processing image...' : 'Upload an image'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Drag and drop or click to select
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Max size: {maxSizeMB}MB • Formats: JPG, PNG, WebP
            </p>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mt-3 flex items-center space-x-2 text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="mt-3 flex items-center space-x-2 text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm">{success}</span>
        </div>
      )}

      {/* Image Preview */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Tips for better results:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Use high-quality images (at least 800x600 pixels)</li>
          <li>• JPG format works best for photos</li>
          <li>• PNG format works best for graphics with transparency</li>
          <li>• Images will be automatically optimized for web use</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUploader;