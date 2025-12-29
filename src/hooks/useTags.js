import { useState, useCallback } from 'react';
import tagService from '../services/tagService';

export const useTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTags = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tagService.getTags();
      setTags(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch tags';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const createTag = async (tagData) => {
    try {
      const response = await tagService.createTag(tagData);
      setTags([...tags, response.data]);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create tag';
      return { success: false, message: errorMessage };
    }
  };

  const deleteTag = async (id) => {
    try {
      await tagService.deleteTag(id);
      setTags(tags.filter((t) => t._id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete tag';
      return { success: false, message: errorMessage };
    }
  };

  return {
    tags,
    loading,
    error,
    fetchTags,
    createTag,
    deleteTag,
  };
};