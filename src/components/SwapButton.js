import React from 'react';
import './SwapButton.css';

function SwapButton({ onClick, isLoading }) {
  return (
    <div className="swap-button-container">
      <button
        className={`swap-button ${isLoading ? 'loading' : ''}`}
        onClick={onClick}
        disabled={isLoading}
        aria-label="Swap currencies"
        title="Swap currencies"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="swap-icon"
        >
          <path
            d="M16 17L21 12L16 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12H9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 7L3 12L8 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 12H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {isLoading && <div className="loading-spinner"></div>}
      </button>
    </div>
  );
}

export default SwapButton; 