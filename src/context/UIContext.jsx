import React, { createContext, useState } from 'react';

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  // Select/deselect asset
  const toggleAssetSelection = (assetId) => {
    if (selectedAssets.includes(assetId)) {
      setSelectedAssets(selectedAssets.filter((id) => id !== assetId));
    } else {
      setSelectedAssets([...selectedAssets, assetId]);
    }
  };

  // Select all assets
  const selectAllAssets = (assetIds) => {
    setSelectedAssets(assetIds);
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedAssets([]);
  };

  // Open modal
  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  const value = {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    viewMode,
    setViewMode,
    toggleViewMode,
    selectedAssets,
    toggleAssetSelection,
    selectAllAssets,
    clearSelection,
    modalOpen,
    modalContent,
    openModal,
    closeModal,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};