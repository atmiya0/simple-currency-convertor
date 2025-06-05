import React from 'react';
import './ConversionResult.css';

function ConversionResult({ 
  fromAmount, 
  fromCurrency, 
  toAmount, 
  toCurrency, 
  currencies,
  isLoading 
}) {
  const fromCurrencyName = currencies.find(c => c.code === fromCurrency)?.name || '';
  const toCurrencyName = currencies.find(c => c.code === toCurrency)?.name || '';

  const formatAmount = (amount) => {
    // Round to 3 decimal places if needed
    const roundedAmount = Math.round(amount * 1000) / 1000;
    
    // Format with up to 3 decimal places, removing unnecessary trailing zeros
    let formatted = roundedAmount.toFixed(3);
    
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

  return (
    <div className={`conversion-result ${isLoading ? 'loading' : ''}`}>
      <div className="result-content">
        {isLoading ? (
          <div className="result-skeleton">
            <div className="skeleton-text-line"></div>
          </div>
        ) : (
          <>
            <span className="result-amount">{formatAmount(fromAmount)}</span>
            <span className="result-currency"> {fromCurrencyName} = </span>
            <span className="result-amount">{formatAmount(toAmount)}</span>
            <span className="result-currency"> {toCurrencyName}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default ConversionResult; 