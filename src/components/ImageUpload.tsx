import React, { useState } from 'react';

interface ImageUploadProps {
    onImageUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            onImageUpload(file);

           const reader = new FileReader();
              reader.onload = () => {
                setPreviewUrl(reader.result as string);
              };
             reader.readAsDataURL(file);

        }
    };


    return (
        <div>
             <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4 bg-white dark:bg-dark-primary  shadow"
            />
             {previewUrl && (
                <div className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Uploaded Image Preview"
                    className="max-h-40  shadow rounded"
                  />
                </div>
              )}
        </div>
    );
};
export default ImageUpload;