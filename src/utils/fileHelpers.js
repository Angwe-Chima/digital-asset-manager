import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import DescriptionIcon from '@mui/icons-material/Description';
import TableChartIcon from '@mui/icons-material/TableChart';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

// Get file type from MIME type
export const getFileType = (mimeType) => {
  if (!mimeType) return 'other';
  
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType.startsWith('video/')) return 'video';
  if (
    mimeType.includes('document') ||
    mimeType.includes('word') ||
    mimeType === 'application/msword'
  )
    return 'document';
  if (
    mimeType.includes('sheet') ||
    mimeType.includes('excel') ||
    mimeType === 'application/vnd.ms-excel'
  )
    return 'spreadsheet';
  if (
    mimeType.includes('presentation') ||
    mimeType.includes('powerpoint') ||
    mimeType === 'application/vnd.ms-powerpoint'
  )
    return 'presentation';
  
  return 'other';
};

// Get icon component for file type
export const getFileIcon = (fileType) => {
  switch (fileType) {
    case 'image':
      return ImageIcon;
    case 'pdf':
      return PictureAsPdfIcon;
    case 'video':
      return VideoFileIcon;
    case 'document':
      return DescriptionIcon;
    case 'spreadsheet':
      return TableChartIcon;
    case 'presentation':
      return SlideshowIcon;
    default:
      return InsertDriveFileIcon;
  }
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

// Get file extension from filename
export const getFileExtension = (filename) => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toUpperCase();
};

// Check if file is an image
export const isImage = (fileType) => {
  return fileType === 'image';
};

// Check if file is a video
export const isVideo = (fileType) => {
  return fileType === 'video';
};

// Check if file is a PDF
export const isPDF = (fileType) => {
  return fileType === 'pdf';
};