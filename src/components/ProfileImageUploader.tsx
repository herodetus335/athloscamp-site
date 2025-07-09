import React, { useState } from 'react';
import ImageUploader from './ImageUploader';

const ProfileImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    
    console.log('Optimized image:', file);
    console.log('File size:', file.size, 'bytes');
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h3 className="text-lg font-semibold mb-4">Upload Coach Photo</h3>
      
      <ImageUploader
        onImageSelect={handleImageSelect}
        maxSizeMB={2}
        acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
        className="mb-4"
      />
      
      {imagePreview && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Preview:</h4>
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg border"
          />
          {selectedImage && (
            <p className="text-xs text-gray-500 mt-2">
              File size: {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileImageUploader;