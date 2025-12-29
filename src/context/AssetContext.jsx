import React, { createContext, useState, useCallback } from 'react';
import api from '../services/api';

export const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalAssets, setTotalAssets] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch assets with filters
  const fetchAssets = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      
      if (filters.folder !== undefined) params.append('folder', filters.folder);
      if (filters.fileType) params.append('fileType', filters.fileType);
      if (filters.tags) params.append('tags', filters.tags);
      if (filters.search) params.append('search', filters.search);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.order) params.append('order', filters.order);
      
      const response = await api.get(`/assets?${params.toString()}`);
      
      setAssets(response.data.data);
      setTotalAssets(response.data.total);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch assets';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single asset
  const getAsset = async (id) => {
    try {
      const response = await api.get(`/assets/${id}`);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch asset';
      return { success: false, message: errorMessage };
    }
  };

  // Create asset
  const createAsset = async (assetData) => {
    try {
      const response = await api.post('/assets', assetData);
      setAssets([response.data.data, ...assets]);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create asset';
      return { success: false, message: errorMessage };
    }
  };

  // Update asset
  const updateAsset = async (id, assetData) => {
    try {
      const response = await api.put(`/assets/${id}`, assetData);
      setAssets(assets.map((a) => (a._id === id ? response.data.data : a)));
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update asset';
      return { success: false, message: errorMessage };
    }
  };

  // Delete asset
  const deleteAsset = async (id) => {
    try {
      await api.delete(`/assets/${id}`);
      setAssets(assets.filter((a) => a._id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete asset';
      return { success: false, message: errorMessage };
    }
  };

  // Increment download count
  const trackDownload = async (id) => {
    try {
      await api.post(`/assets/${id}/download`);
      setAssets(
        assets.map((a) =>
          a._id === id ? { ...a, downloads: (a.downloads || 0) + 1 } : a
        )
      );
    } catch (err) {
      console.error('Failed to track download:', err);
    }
  };

  // Increment view count
  const trackView = async (id) => {
    try {
      await api.post(`/assets/${id}/view`);
      setAssets(
        assets.map((a) =>
          a._id === id ? { ...a, views: (a.views || 0) + 1 } : a
        )
      );
    } catch (err) {
      console.error('Failed to track view:', err);
    }
  };

  // Search assets
  const searchAssets = async (query) => {
    try {
      const response = await api.get(`/assets/search/${query}`);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Search failed';
      return { success: false, message: errorMessage };
    }
  };

  const value = {
    assets,
    loading,
    error,
    totalAssets,
    currentPage,
    totalPages,
    fetchAssets,
    getAsset,
    createAsset,
    updateAsset,
    deleteAsset,
    trackDownload,
    trackView,
    searchAssets,
  };

  return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>;
};