import React from 'react';
import './ChevronDown.css';

function ChevronDown({ isOpen = false }) {
  return (
    <div className={`chevron-down ${isOpen ? 'open' : ''}`}>
      <svg
        width="23"
        height="13"
        viewBox="0 0 23 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.49274 11.4927L3.34894 5.34894C1.67113 3.67113 0.832223 2.83222 0.775538 2.11198C0.726355 1.48704 0.979322 0.876326 1.456 0.469205C2.00537 0 3.19176 0 5.56454 0H17.8521C20.2249 0 21.4113 0 21.9607 0.469205C22.4373 0.876326 22.6903 1.48704 22.6411 2.11198C22.5844 2.83222 21.7455 3.67113 20.0677 5.34893L13.9239 11.4927C13.1484 12.2683 12.7606 12.656 12.3135 12.8013C11.9202 12.9291 11.4965 12.9291 11.1032 12.8013C10.656 12.656 10.2683 12.2683 9.49274 11.4927Z"
          fill="#A0A5AB"
        />
      </svg>
    </div>
  );
}

export default ChevronDown; 