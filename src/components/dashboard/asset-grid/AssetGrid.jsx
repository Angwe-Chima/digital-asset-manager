import React from 'react';
import AssetCard from '../asset-card/AssetCard';
import Loader from '../../common/loader/Loader';
import ErrorMessage from '../../common/error-message/ErrorMessage';
import './AssetGrid.css';

const AssetGrid = ({
  assets,
  loading,
  error,
  onView,
  onEdit,
  onDelete,
  onDownload,
  onRetry,
}) => {
  if (loading) {
    return (
      <div className="asset-grid-loading">
        <Loader size="large" text="Loading assets..." />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (!assets || assets.length === 0) {
    return (
      <div className="asset-grid-empty">
        <p className="empty-text">No assets found</p>
        <p className="empty-subtext">Try adjusting your filters or upload some files</p>
      </div>
    );
  }

  return (
    <div className="asset-grid">
      {assets.map((asset) => (
        <AssetCard
          key={asset._id}
          asset={asset}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
};

export default AssetGrid;