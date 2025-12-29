import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { formatFileSize, getFileIcon, isImage } from '../../../utils/fileHelpers';
import { formatDate } from '../../../utils/formatDate';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './AssetCard.css';

const AssetCard = ({ asset, onView, onEdit, onDelete, onDownload }) => {
  const { isAdmin } = useAuth();
  const FileIcon = getFileIcon(asset.fileType);
  const imageUrl = isImage(asset.fileType)
    ? `http://localhost:5000${asset.fileUrl}`
    : null;

  const handleDownload = (e) => {
    e.stopPropagation();
    if (onDownload) onDownload(asset);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(asset);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(asset);
  };

  return (
    <div className="asset-card" onClick={() => onView && onView(asset)}>
      {/* Thumbnail */}
      <div className="asset-thumbnail">
        {imageUrl ? (
          <img src={imageUrl} alt={asset.name} className="asset-image" />
        ) : (
          <div className="asset-icon-wrapper">
            <FileIcon className="asset-icon" />
          </div>
        )}
        
        {/* Quick Actions Overlay */}
        <div className="asset-actions-overlay">
          <button
            className="asset-action-btn"
            onClick={() => onView && onView(asset)}
            title="View"
          >
            <VisibilityIcon />
          </button>
          <button
            className="asset-action-btn"
            onClick={handleDownload}
            title="Download"
          >
            <DownloadIcon />
          </button>
          {isAdmin && (
            <>
              <button
                className="asset-action-btn"
                onClick={handleEdit}
                title="Edit"
              >
                <EditIcon />
              </button>
              <button
                className="asset-action-btn asset-action-delete"
                onClick={handleDelete}
                title="Delete"
              >
                <DeleteIcon />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="asset-info">
        <h3 className="asset-name" title={asset.name}>
          {asset.name}
        </h3>
        
        <div className="asset-meta">
          <span className={`asset-type asset-type-${asset.fileType}`}>
            {asset.fileType.toUpperCase()}
          </span>
          <span className="asset-size">{formatFileSize(asset.fileSize)}</span>
        </div>

        <div className="asset-stats">
          <span className="asset-stat">
            <DownloadIcon className="stat-icon" />
            {asset.downloads || 0}
          </span>
          <span className="asset-stat">
            <VisibilityIcon className="stat-icon" />
            {asset.views || 0}
          </span>
        </div>

        <p className="asset-date">{formatDate(asset.createdAt)}</p>
      </div>
    </div>
  );
};

export default AssetCard;