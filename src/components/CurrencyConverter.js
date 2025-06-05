import React, { useState, useEffect } from 'react';
import CurrencyField from './CurrencyField';
import ConversionResult from './ConversionResult';
import SwapButton from './SwapButton';
import './CurrencyConverter.css';

// Dummy exchange rates
const exchangeRates = {
  'CAD': {
    'USD': 0.7386,
    'EUR': 0.6821,
    'GBP': 0.5842,
    'JPY': 108.32,
    'CAD': 1
  },
  'USD': {
    'CAD': 1.3539,
    'EUR': 0.9236,
    'GBP': 0.7911,
    'JPY': 146.72,
    'USD': 1
  },
  'EUR': {
    'CAD': 1.4658,
    'USD': 1.0828,
    'GBP': 0.8565,
    'JPY': 158.89,
    'EUR': 1
  },
  'GBP': {
    'CAD': 1.7119,
    'USD': 1.2641,
    'EUR': 1.1675,
    'JPY': 185.42,
    'GBP': 1
  },
  'JPY': {
    'CAD': 0.0092,
    'USD': 0.0068,
    'EUR': 0.0063,
    'GBP': 0.0054,
    'JPY': 1
  }
};

const currencies = [
  { code: 'CAD', name: 'Canadian Dollar', symbol: '$' },
  { code: 'USD', name: 'United State Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' }
];

function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('CAD');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromAmount, setFromAmount] = useState(100);
  const [toAmount, setToAmount] = useState(73.86);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    setIsConverting(true);
    // Simulate API delay for better UX
    const timer = setTimeout(() => {
      const rate = exchangeRates[fromCurrency][toCurrency];
      const convertedAmount = fromAmount * rate;
      setToAmount(convertedAmount);
      setIsConverting(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [fromCurrency, toCurrency, fromAmount]);

  const handleFromAmountChange = (amount) => {
    setFromAmount(amount);
  };

  const handleToAmountChange = (amount) => {
    setToAmount(amount);
    // Reverse calculation
    const rate = exchangeRates[toCurrency][fromCurrency];
    const convertedAmount = amount * rate;
    setFromAmount(convertedAmount);
  };

  const handleSwapCurrencies = () => {
    // Add a small animation delay
    setIsConverting(true);
    setTimeout(() => {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      setFromAmount(toAmount);
      setToAmount(fromAmount);
      setIsConverting(false);
    }, 200);
  };

  return (
    <div className="currency-converter">
      <div className="converter-header">
        <h1 className="converter-title">Currency Converter</h1>
        <p className="converter-subtitle">Convert between different currencies with real-time rates</p>
      </div>
      
      <div className="converter-fields">
        <CurrencyField
          label="From"
          currency={fromCurrency}
          amount={fromAmount}
          currencies={currencies}
          onCurrencyChange={setFromCurrency}
          onAmountChange={handleFromAmountChange}
          isLoading={isConverting}
        />
        
        <SwapButton onClick={handleSwapCurrencies} isLoading={isConverting} />
        
        <CurrencyField
          label="To"
          currency={toCurrency}
          amount={toAmount}
          currencies={currencies}
          onCurrencyChange={setToCurrency}
          onAmountChange={handleToAmountChange}
          isLoading={isConverting}
        />
      </div>
      
      <ConversionResult
        fromAmount={fromAmount}
        fromCurrency={fromCurrency}
        toAmount={toAmount}
        toCurrency={toCurrency}
        currencies={currencies}
        isLoading={isConverting}
      />
    </div>
  );
}

export default CurrencyConverter; 