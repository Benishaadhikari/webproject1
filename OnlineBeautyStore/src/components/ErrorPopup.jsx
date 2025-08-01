import React from 'react';
import './ErrorPopup.css';

const ErrorPopup = ({ isVisible, message, onClose, onGoHome }) => {
  if (!isVisible) return null;

  return (
    <div className="error-popup-overlay">
      <div className="error-popup">
        <div className="error-popup-header">
          <div className="error-popup-icon">
            <span className="error-icon">⚠️</span>
          </div>
          <button className="error-popup-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="error-popup-content">
          <h3 className="error-popup-title">Oops! Something went wrong</h3>
          <p className="error-popup-message">
            {message || "The page you're looking for seems to have wandered off into the beauty universe."}
          </p>
          
          <div className="error-popup-actions">
            <button className="error-popup-btn primary" onClick={onGoHome}>
              🏠 Back to BeautyStore
            </button>
            <button className="error-popup-btn secondary" onClick={onClose}>
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup; 