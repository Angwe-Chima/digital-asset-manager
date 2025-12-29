import api from './api';

const assetService = {
  // Get all assets
  getAssets: async (params) => {
    const response = await api.get('/assets', { params });
    return response.data;
  },

  // Get single asset
  getAsset: async (id) => {
    const response = await api.get(`/assets/${id}`);
    return response.data;
  },

  // Create asset
  createAsset: async (assetData) => {
    const response = await api.post('/assets', assetData);
    return response.data;
  },

  // Update asset
  updateAsset: async (id, assetData) => {
    const response = await api.put(`/assets/${id}`, assetData);
    return response.data;
  },

  // Delete asset
  deleteAsset: async (id) => {
    const response = await api.delete(`/assets/${id}`);
    return response.data;
  },

  // Search assets
  searchAssets: async (query) => {
    const response = await api.get(`/assets/search/${query}`);
    return response.data;
  },
};

export default assetService;