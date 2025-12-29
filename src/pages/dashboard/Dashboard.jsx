import React, { useEffect, useState } from 'react';
import { useAssets } from '../../hooks/useAssets';
import { useAuth } from '../../hooks/useAuth';
import Layout from '../../components/layout/layout/Layout';
import AssetGrid from '../../components/dashboard/asset-grid/AssetGrid';
import AssetPreview from '../../components/dashboard/asset-preview/AssetPreview';
import api from '../../services/api';
import './Dashboard.css';

import { useFolders } from '../../hooks/useFolders';
import { useTags } from '../../hooks/useTags';
import UploadArea from '../../components/dashboard/upload-area/UploadArea';
import FolderForm from '../../components/admin/folder-form/FolderForm';
import Button from '../../components/common/button/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

const Dashboard = () => {
  const { assets, loading, error, fetchAssets, deleteAsset, trackDownload } =
    useAssets();
  const { isAdmin } = useAuth();

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [filters, setFilters] = useState({
    folder: null,
    tags: [],
    fileType: 'all',
    search: '',
  });

  const { folders, fetchFolders, createFolder } = useFolders();
  const { tags, fetchTags } = useTags();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [folderModalOpen, setFolderModalOpen] = useState(false);

  // Fetch assets on mount and when filters change
  useEffect(() => {
    const params = {
      page: 1,
      limit: 50,
      sortBy: 'createdAt',
      order: 'desc',
    };

    if (filters.folder !== null) {
      params.folder = filters.folder;
    }

    if (filters.tags.length > 0) {
      params.tags = filters.tags.join(',');
    }

    if (filters.fileType && filters.fileType !== 'all') {
      params.fileType = filters.fileType;
    }

    if (filters.search) {
      params.search = filters.search;
    }

    fetchAssets(params);
  }, [filters, fetchAssets]);

  useEffect(() => {
    fetchFolders();
    fetchTags();
  }, [fetchFolders, fetchTags]);

  // Handle search
  const handleSearch = (query) => {
    setFilters((prev) => ({ ...prev, search: query }));
  };

  // Handle filter change from sidebar
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      folder: newFilters.folder !== undefined ? newFilters.folder : prev.folder,
      tags: newFilters.tags !== undefined ? newFilters.tags : prev.tags,
      fileType:
        newFilters.fileType !== undefined ? newFilters.fileType : prev.fileType,
    }));
  };

  // Handle view asset
  const handleViewAsset = (asset) => {
    setSelectedAsset(asset);
    setPreviewOpen(true);
  };

  // Handle edit asset
  const handleEditAsset = (asset) => {
    console.log('Edit asset:', asset);
    // TODO: Open edit modal (Phase 10)
  };

  // Handle delete asset
  const handleDeleteAsset = async (asset) => {
    if (window.confirm(`Are you sure you want to delete "${asset.name}"?`)) {
      const result = await deleteAsset(asset._id);
      if (result.success) {
        setPreviewOpen(false);
        setSelectedAsset(null);
      }
    }
  };

  // Handle download asset
  const handleDownloadAsset = async (asset) => {
    try {
      // Track download
      await trackDownload(asset._id);

      // Download file
      const link = document.createElement('a');
      link.href = `https://digital-asset-manager-backend.onrender.com${asset.fileUrl}`;
      link.download = asset.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  // Handle retry
  const handleRetry = () => {
    fetchAssets({
      page: 1,
      limit: 50,
      sortBy: 'createdAt',
      order: 'desc',
    });
  };

  return (
    <Layout onSearch={handleSearch} onFilterChange={handleFilterChange}>
      <div className="dashboard">
        {/* Admin Toolbar - Coming in Phase 10 */}
        {isAdmin && (
          <div className="dashboard-toolbar">
            <div className="toolbar-info">
              <h2 className="dashboard-heading">Assets</h2>
              <p className="dashboard-subheading">Manage your digital assets</p>
            </div>
            <div className="toolbar-actions">
              <Button
                variant="secondary"
                icon={<CreateNewFolderIcon />}
                onClick={() => setFolderModalOpen(true)}
              >
                New Folder
              </Button>
              <Button
                variant="primary"
                icon={<CloudUploadIcon />}
                onClick={() => setUploadModalOpen(true)}
              >
                Upload Files
              </Button>
            </div>
          </div>
        )}

        {/* Asset Grid */}
        <AssetGrid
          assets={assets}
          loading={loading}
          error={error}
          onView={handleViewAsset}
          onEdit={isAdmin ? handleEditAsset : undefined}
          onDelete={isAdmin ? handleDeleteAsset : undefined}
          onDownload={handleDownloadAsset}
          onRetry={handleRetry}
        />

        {/* Asset Preview Modal */}
        {selectedAsset && (
          <AssetPreview
            asset={selectedAsset}
            isOpen={previewOpen}
            onClose={() => {
              setPreviewOpen(false);
              setSelectedAsset(null);
            }}
            onEdit={isAdmin ? handleEditAsset : undefined}
            onDelete={isAdmin ? handleDeleteAsset : undefined}
            onDownload={handleDownloadAsset}
          />
        )}
      </div>

      {/* Upload Modal */}
      <UploadArea
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        folders={folders}
        tags={tags}
      />

      {/* Folder Modal */}
      <FolderForm
        isOpen={folderModalOpen}
        onClose={() => setFolderModalOpen(false)}
        onSubmit={createFolder}
        folders={folders}
      />
    </Layout>
  );
};

export default Dashboard;
