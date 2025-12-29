import React, { useEffect, useState } from 'react';
import { useUI } from '../../../hooks/useUI';
import api from '../../../services/api';
import FolderIcon from '@mui/icons-material/Folder';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import DescriptionIcon from '@mui/icons-material/Description';
import './Sidebar.css';

const Sidebar = ({ onFilterChange }) => {
  const { sidebarOpen } = useUI();
  const [folders, setFolders] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeTags, setActiveTags] = useState([]);
  const [activeFileType, setActiveFileType] = useState('all');

  // Fetch folders and tags
  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const [foldersRes, tagsRes] = await Promise.all([
          api.get('/folders'),
          api.get('/tags'),
        ]);
        setFolders(foldersRes.data.data);
        setTags(tagsRes.data.data);
      } catch (error) {
        console.error('Failed to fetch filters:', error);
      }
    };

    fetchFiltersData();
  }, []);

  // Handle folder selection
  const handleFolderClick = (folderId) => {
    const newFolder = activeFolder === folderId ? null : folderId;
    setActiveFolder(newFolder);
    if (onFilterChange) {
      onFilterChange({ folder: newFolder, tags: activeTags, fileType: activeFileType });
    }
  };

  // Handle tag selection
  const handleTagClick = (tagId) => {
    const newTags = activeTags.includes(tagId)
      ? activeTags.filter((id) => id !== tagId)
      : [...activeTags, tagId];
    setActiveTags(newTags);
    if (onFilterChange) {
      onFilterChange({ folder: activeFolder, tags: newTags, fileType: activeFileType });
    }
  };

  // Handle file type filter
  const handleFileTypeClick = (type) => {
    setActiveFileType(type);
    if (onFilterChange) {
      onFilterChange({ folder: activeFolder, tags: activeTags, fileType: type });
    }
  };

  const fileTypes = [
    { value: 'all', label: 'All Files', icon: ImageIcon },
    { value: 'image', label: 'Images', icon: ImageIcon },
    { value: 'pdf', label: 'PDFs', icon: PictureAsPdfIcon },
    { value: 'video', label: 'Videos', icon: VideoFileIcon },
    { value: 'document', label: 'Documents', icon: DescriptionIcon },
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-content">
        {/* File Type Filter */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">File Types</h3>
          <div className="sidebar-list">
            {fileTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.value}
                  className={`sidebar-item ${activeFileType === type.value ? 'active' : ''}`}
                  onClick={() => handleFileTypeClick(type.value)}
                >
                  <Icon className="sidebar-icon" />
                  <span className="sidebar-label">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Folders */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">
            <FolderIcon className="sidebar-title-icon" />
            Folders
          </h3>
          
          {folders.length === 0 ? (
            <p className="sidebar-empty">No folders yet</p>
          ) : (
            <div className="sidebar-list">
              <button
                className={`sidebar-item ${activeFolder === null ? 'active' : ''}`}
                onClick={() => handleFolderClick(null)}
              >
                <FolderIcon className="sidebar-icon" />
                <span className="sidebar-label">All Files</span>
              </button>
              
              {folders.map((folder) => (
                <button
                  key={folder._id}
                  className={`sidebar-item ${activeFolder === folder._id ? 'active' : ''}`}
                  onClick={() => handleFolderClick(folder._id)}
                >
                  <FolderIcon
                    className="sidebar-icon"
                    style={{ color: folder.color }}
                  />
                  <span className="sidebar-label">{folder.name}</span>
                  {folder.assetCount > 0 && (
                    <span className="sidebar-count">{folder.assetCount}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">
            <LocalOfferIcon className="sidebar-title-icon" />
            Tags
          </h3>
          
          {tags.length === 0 ? (
            <p className="sidebar-empty">No tags yet</p>
          ) : (
            <div className="sidebar-tags">
              {tags.map((tag) => (
                <button
                  key={tag._id}
                  className={`tag-chip ${activeTags.includes(tag._id) ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag._id)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;