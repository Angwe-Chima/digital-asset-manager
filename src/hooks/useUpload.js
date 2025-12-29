import { useState } from 'react';
import uploadService from '../services/uploadService';

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadFile = async (file) => {
    try {
      setUploading(true);
      setProgress(0);
      setError(null);

      const result = await uploadService.uploadSingle(file, (percent) => {
        setProgress(percent);
      });

      setUploading(false);
      return { success: true, data: result.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Upload failed';
      setError(errorMessage);
      setUploading(false);
      return { success: false, message: errorMessage };
    }
  };

  const uploadMultipleFiles = async (files) => {
    try {
      setUploading(true);
      setProgress(0);
      setError(null);

      const result = await uploadService.uploadMultiple(files, (percent) => {
        setProgress(percent);
      });

      setUploading(false);
      return { success: true, data: result.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Upload failed';
      setError(errorMessage);
      setUploading(false);
      return { success: false, message: errorMessage };
    }
  };

  return {
    uploading,
    progress,
    error,
    uploadFile,
    uploadMultipleFiles,
  };
};