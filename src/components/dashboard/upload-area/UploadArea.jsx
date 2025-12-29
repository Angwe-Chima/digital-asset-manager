import React, { useState, useRef } from 'react';
import { useUpload } from '../../../hooks/useUpload';
import { useAssets } from '../../../hooks/useAssets';
import { getFileType } from '../../../utils/fileHelpers';
import Modal from '../../common/modal/Modal';
import Button from '../../common/button/Button';
import Input from '../../common/input/Input';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import './UploadArea.css';

const UploadArea = ({ isOpen, onClose, folders, tags }) => {
  const { uploadFile } = useUpload();
  const { createAsset } = useAssets();
  
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFiles = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    setFiles((prev) => [...prev, ...fileArray]);
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Remove file from list
  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload all files
  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    const progress = {};

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      progress[i] = 0;
      setUploadProgress({ ...progress });

      try {
        // Upload file
        const uploadResult = await uploadFile(file);
        
        if (uploadResult.success) {
          progress[i] = 100;
          setUploadProgress({ ...progress });

          // Create asset in database
          const assetData = {
            name: file.name,
            description: '',
            fileUrl: uploadResult.data.url,
            fileType: getFileType(file.type),
            fileSize: file.size,
            mimeType: file.type,
            folder: null,
            tags: [],
          };

          await createAsset(assetData);
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }

    setUploading(false);
    setFiles([]);
    setUploadProgress({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Files" size="large">
      <div className="upload-area">
        {/* Drop Zone */}
        <div
          className={`drop-zone ${dragActive ? 'drop-zone-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <CloudUploadIcon className="drop-icon" />
          <p className="drop-text">
            Drag and drop files here, or click to browse
          </p>
          <p className="drop-subtext">
            Supports images, PDFs, documents, videos (Max 50MB)
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            style={{ display: 'none' }}
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="file-list">
            <h3 className="file-list-title">
              Selected Files ({files.length})
            </h3>
            
            {files.map((file, index) => (
              <div key={index} className="file-item">
                <div className="file-info">
                  <p className="file-name">{file.name}</p>
                  <p className="file-size">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                
                {uploadProgress[index] !== undefined ? (
                  <div className="file-progress">
                    <div
                      className="file-progress-bar"
                      style={{ width: `${uploadProgress[index]}%` }}
                    />
                  </div>
                ) : (
                  <button
                    className="file-remove"
                    onClick={() => removeFile(index)}
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="upload-actions">
          <Button variant="ghost" onClick={onClose} disabled={uploading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={files.length === 0 || uploading}
            loading={uploading}
          >
            Upload {files.length > 0 && `(${files.length})`}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadArea;