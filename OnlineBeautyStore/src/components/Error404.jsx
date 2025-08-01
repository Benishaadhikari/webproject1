import React from 'react';
import './Error404.css';

const Error404 = ({ onGoHome }) => {
  return (
    <div className="error-404">
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">
            <span className="error-number">4</span>
            <span className="error-zero">0</span>
            <span className="error-number">4</span>
          </div>
          
          <h1 className="error-title">Oops! Page Not Found</h1>
          <p className="error-description">
            The page you're looking for seems to have wandered off into the beauty universe. 
            Don't worry, we'll help you find your way back!
          </p>
          
          <div className="error-actions">
            <button className="btn-primary" onClick={onGoHome}>
              🏠 Back to BeautyStore
            </button>
            <button className="btn-secondary" onClick={() => window.history.back()}>
              ← Go Back
            </button>
          </div>
          
          <div className="error-suggestions">
            <h3>Popular Pages</h3>
            <div className="suggestion-links">
              <button className="suggestion-link">✨ All Products</button>
              <button className="suggestion-link">💄 Lip Products</button>
              <button className="suggestion-link">👁️ Eye Makeup</button>
              <button className="suggestion-link">🎨 Face Products</button>
            </div>
          </div>
        </div>
        
        <div className="error-decoration">
          <div className="floating-beauty">
            <span className="beauty-icon">💄</span>
            <span className="beauty-icon">🌸</span>
            <span className="beauty-icon">✨</span>
            <span className="beauty-icon">🧴</span>
            <span className="beauty-icon">👁️</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404; 