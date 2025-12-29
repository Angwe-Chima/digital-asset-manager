import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message-container">
      <div className="error-message-content">
        <ErrorOutlineIcon className="error-icon" />
        <p className="error-text">{message}</p>
        {onRetry && (
          <button className="error-retry-btn" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;