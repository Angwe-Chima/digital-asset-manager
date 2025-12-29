import { useState, useCallback } from 'react';
import folderService from '../services/folderService';

export const useFolders = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFolders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await folderService.getFolders();
      setFolders(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch folders';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const createFolder = async (folderData) => {
    try {
      const response = await folderService.createFolder(folderData);
      setFolders([...folders, response.data]);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create folder';
      return { success: false, message: errorMessage };
    }
  };

  const updateFolder = async (id, folderData) => {
    try {
      const response = await folderService.updateFolder(id, folderData);
      setFolders(folders.map((f) => (f._id === id ? response.data : f)));
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update folder';
      return { success: false, message: errorMessage };
    }
  };

  const deleteFolder = async (id) => {
    try {
      await folderService.deleteFolder(id);
      setFolders(folders.filter((f) => f._id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete folder';
      return { success: false, message: errorMessage };
    }
  };

  return {
    folders,
    loading,
    error,
    fetchFolders,
    createFolder,
    updateFolder,
    deleteFolder,
  };
};