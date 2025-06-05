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
    return amount.toFixed(2);
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