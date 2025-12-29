import React from 'react';
import Modal from '../../common/modal/Modal';
import Button from '../../common/button/Button';
import { useAuth } from '../../../hooks/useAuth';
import {
  formatFileSize,
  getFileIcon,
  isImage,
  isVideo,
  isPDF,
} from '../../../utils/fileHelpers';
import { formatFullDate } from '../../../utils/formatDate';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './AssetPreview.css';

const AssetPreview = ({ asset, isOpen, onClose, onEdit, onDelete, onDownload }) => {
  const { isAdmin } = useAuth();
  const FileIcon = getFileIcon(asset?.fileType);
  const fileUrl = asset ? `https://digital-asset-manager-backend.onrender.com${asset.fileUrl}` : null;

  if (!asset) return null;

  const handleDownload = () => {
    if (onDownload) onDownload(asset);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(asset);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(asset);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Asset Preview" size="large">
      <div className="asset-preview">
        {/* Preview Section */}
        <div className="preview-media">
          {isImage(asset.fileType) && (
            <img src={fileUrl} alt={asset.name} className="preview-image" />
          )}
          
          {isVideo(asset.fileType) && (
            <video controls className="preview-video">
              <source src={fileUrl} type={asset.mimeType} />
              Your browser does not support the video tag.
            </video>
          )}
          
          {isPDF(asset.fileType) && (
            <iframe
              src={fileUrl}
              className="preview-pdf"
              title={asset.name}
            />
          )}
          
          {!isImage(asset.fileType) &&
            !isVideo(asset.fileType) &&
            !isPDF(asset.fileType) && (
              <div className="preview-icon-wrapper">
                <FileIcon className="preview-icon" />
                <p className="preview-no-preview">No preview available</p>
              </div>
            )}
        </div>

        {/* Details Section */}
        <div className="preview-details">
          <h2 className="preview-title">{asset.name}</h2>
          
          {asset.description && (
            <p className="preview-description">{asset.description}</p>
          )}

          <div className="preview-info-grid">
            <div className="preview-info-item">
              <span className="info-label">Type</span>
              <span className={`info-value asset-type-${asset.fileType}`}>
                {asset.fileType.toUpperCase()}
              </span>
            </div>

            <div className="preview-info-item">
              <span className="info-label">Size</span>
              <span className="info-value">{formatFileSize(asset.fileSize)}</span>
            </div>

            <div className="preview-info-item">
              <span className="info-label">
                <DownloadIcon className="info-icon" />
                Downloads
              </span>
              <span className="info-value">{asset.downloads || 0}</span>
            </div>

            <div className="preview-info-item">
              <span className="info-label">
                <VisibilityIcon className="info-icon" />
                Views
              </span>
              <span className="info-value">{asset.views || 0}</span>
            </div>

            {asset.folder && (
              <div className="preview-info-item">
                <span className="info-label">
                  <FolderIcon className="info-icon" />
                  Folder
                </span>
                <span className="info-value">{asset.folder.name}</span>
              </div>
            )}

            {asset.uploadedBy && (
              <div className="preview-info-item">
                <span className="info-label">
                  <PersonIcon className="info-icon" />
                  Uploaded By
                </span>
                <span className="info-value">{asset.uploadedBy.name}</span>
              </div>
            )}

            <div className="preview-info-item">
              <span className="info-label">
                <CalendarTodayIcon className="info-icon" />
                Created
              </span>
              <span className="info-value">{formatFullDate(asset.createdAt)}</span>
            </div>
          </div>

          {/* Tags */}
          {asset.tags && asset.tags.length > 0 && (
            <div className="preview-tags">
              <span className="tags-label">
                <LocalOfferIcon className="info-icon" />
                Tags
              </span>
              <div className="tags-list">
                {asset.tags.map((tag) => (
                  <span key={tag._id} className="tag-chip">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="preview-actions">
            <Button
              variant="primary"
              icon={<DownloadIcon />}
              onClick={handleDownload}
            >
              Download
            </Button>

            {isAdmin && (
              <>
                <Button
                  variant="secondary"
                  icon={<EditIcon />}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  icon={<DeleteIcon />}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AssetPreview;