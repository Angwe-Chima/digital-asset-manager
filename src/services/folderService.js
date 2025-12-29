import api from './api';

const folderService = {
  // Get all folders
  getFolders: async () => {
    const response = await api.get('/folders');
    return response.data;
  },

  // Get folder tree
  getFolderTree: async () => {
    const response = await api.get('/folders/tree');
    return response.data;
  },

  // Get single folder
  getFolder: async (id) => {
    const response = await api.get(`/folders/${id}`);
    return response.data;
  },

  // Create folder
  createFolder: async (folderData) => {
    const response = await api.post('/folders', folderData);
    return response.data;
  },

  // Update folder
  updateFolder: async (id, folderData) => {
    const response = await api.put(`/folders/${id}`, folderData);
    return response.data;
  },

  // Delete folder
  deleteFolder: async (id) => {
    const response = await api.delete(`/folders/${id}`);
    return response.data;
  },
};

export default folderService;