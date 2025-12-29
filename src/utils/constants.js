// File type colors
export const FILE_TYPE_COLORS = {
  image: '#10B981',
  pdf: '#EF4444',
  video: '#8B5CF6',
  document: '#3B82F6',
  spreadsheet: '#10B981',
  presentation: '#F59E0B',
  other: '#6B7280',
};

// View modes
export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
};

// Sort options
export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date Created', order: 'desc' },
  { value: 'name', label: 'Name (A-Z)', order: 'asc' },
  { value: 'name', label: 'Name (Z-A)', order: 'desc' },
  { value: 'fileSize', label: 'Size (Smallest)', order: 'asc' },
  { value: 'fileSize', label: 'Size (Largest)', order: 'desc' },
  { value: 'downloads', label: 'Most Downloaded', order: 'desc' },
];

// File type filters
export const FILE_TYPE_FILTERS = [
  { value: 'all', label: 'All Files' },
  { value: 'image', label: 'Images' },
  { value: 'pdf', label: 'PDFs' },
  { value: 'video', label: 'Videos' },
  { value: 'document', label: 'Documents' },
  { value: 'spreadsheet', label: 'Spreadsheets' },
  { value: 'presentation', label: 'Presentations' },
];

// API base URL
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// File upload limits
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ALLOWED_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'svg',
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'mp4',
  'mov',
  'avi',
  'webm',
];
