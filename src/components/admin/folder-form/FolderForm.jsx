import React, { useState } from 'react';
import Modal from '../../common/modal/Modal';
import Button from '../../common/button/Button';
import Input from '../../common/input/Input';
import './FolderForm.css';

const FolderForm = ({ isOpen, onClose, onSubmit, folders = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
    parentFolder: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await onSubmit(formData);

    setLoading(false);
    setFormData({ name: '', description: '', color: '#3B82F6', parentFolder: null });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Folder" size="medium">
      <form onSubmit={handleSubmit} className="folder-form">
        <Input
          label="Folder Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="My Folder"
          required
        />

        <div className="form-group">
          <label className="input-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional description"
            className="form-textarea"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label className="input-label">Color</label>
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="form-color-input"
          />
        </div>

        <div className="form-group">
          <label className="input-label">Parent Folder (Optional)</label>
          <select
            name="parentFolder"
            value={formData.parentFolder || ''}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">None (Root Level)</option>
            {folders.map((folder) => (
              <option key={folder._id} value={folder._id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Create Folder
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FolderForm;