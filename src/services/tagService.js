import api from './api';

const tagService = {
  // Get all tags
  getTags: async () => {
    const response = await api.get('/tags');
    return response.data;
  },

  // Get popular tags
  getPopularTags: async (limit = 10) => {
    const response = await api.get(`/tags/popular?limit=${limit}`);
    return response.data;
  },

  // Get single tag
  getTag: async (id) => {
    const response = await api.get(`/tags/${id}`);
    return response.data;
  },

  // Create tag
  createTag: async (tagData) => {
    const response = await api.post('/tags', tagData);
    return response.data;
  },

  // Update tag
  updateTag: async (id, tagData) => {
    const response = await api.put(`/tags/${id}`, tagData);
    return response.data;
  },

  // Delete tag
  deleteTag: async (id) => {
    const response = await api.delete(`/tags/${id}`);
    return response.data;
  },
};

export default tagService;