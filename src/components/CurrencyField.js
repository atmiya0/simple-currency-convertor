import React, { useState, useEffect, useRef } from 'react';
import ChevronDown from './ChevronDown';
import './CurrencyField.css';

function CurrencyField({ 
  label, 
  currency, 
  amount, 
  currencies, 
  onCurrencyChange, 
  onAmountChange,
  isLoading 
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const selectedCurrency = currencies.find(c => c.code === currency);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setSearchTerm('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleCurrencySelect = (currencyCode) => {
    onCurrencyChange(currencyCode);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    onAmountChange(value);
  };

  const handleAmountFocus = () => {
    if (!isLoading) {
      setIsEditing(true);
    }
  };

  const handleAmountBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setIsDropdownOpen(false);
    }
  };

  const filteredCurrencies = currencies.filter(curr =>
    curr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    curr.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatAmount = (value) => {
    if (isEditing) return value.toString();
    
    // Round to 3 decimal places if needed
    const roundedValue = Math.round(value * 1000) / 1000;
    
    // Format with up to 3 decimal places, removing unnecessary trailing zeros
    let formatted = roundedValue.toFixed(3);
    
    // Remove trailing zeros after decimal point
    if (formatted.includes('.')) {
      formatted = formatted.replace(/\.?0+$/, '');
    }
    
    // Ensure at least 2 decimal places for currency display
    if (!formatted.includes('.')) {
      formatted += '.00';
    } else if (formatted.split('.')[1].length === 1) {
      formatted += '0';
    }
    
    return formatted;
  };

  const formattedAmount = formatAmount(amount);
  const currencySymbol = selectedCurrency?.symbol || '$';

  return (
    <div className="currency-field">
      <div className="currency-selector">
        <div className={`field-wrapper ${isLoading ? 'loading' : ''}`} ref={dropdownRef}>
          <div className="field-content">
            <div className="field-label">{label}</div>
            <div 
              className="currency-display"
              onClick={() => !isLoading && setIsDropdownOpen(!isDropdownOpen)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsDropdownOpen(!isDropdownOpen);
                }
              }}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              <span className="currency-info">
                <span className="currency-code">{currency}</span>
                <span className="currency-name"> - {selectedCurrency?.name}</span>
              </span>
              <ChevronDown isOpen={isDropdownOpen} />
            </div>
          </div>
          
          {isDropdownOpen && (
            <div className="dropdown" role="listbox">
              <div className="dropdown-search">
                <input
                  type="text"
                  placeholder="Search currencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="dropdown-list">
                {filteredCurrencies.map((curr) => (
                  <div
                    key={curr.code}
                    className={`dropdown-item ${curr.code === currency ? 'selected' : ''}`}
                    onClick={() => handleCurrencySelect(curr.code)}
                    role="option"
                    aria-selected={curr.code === currency}
                  >
                    <span className="currency-flag">{curr.symbol}</span>
                    <span className="currency-details">
                      <span className="currency-code">{curr.code}</span>
                      <span className="currency-name"> - {curr.name}</span>
                    </span>
                  </div>
                ))}
                {filteredCurrencies.length === 0 && (
                  <div className="dropdown-item no-results">
                    No currencies found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="amount-field">
        <div className={`field-wrapper ${isLoading ? 'loading' : ''}`}>
          <div className="field-content">
            <div className="field-label">Amount</div>
            <div className="amount-display">
              <span className="currency-symbol">{currencySymbol}</span>
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  onFocus={handleAmountFocus}
                  onBlur={handleAmountBlur}
                  onKeyDown={handleKeyDown}
                  className="amount-input"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                />
              ) : (
                <div 
                  className={`amount-value ${isLoading ? 'loading' : ''}`}
                  onClick={handleAmountFocus}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleAmountFocus();
                    }
                  }}
                >
                  {isLoading ? (
                    <div className="amount-skeleton">
                      <div className="skeleton-bar"></div>
                    </div>
                  ) : (
                    formattedAmount
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencyField; 