import React from 'react';

interface CurrencyValueProps {
  value: number;
  currency?: string;
  decimals?: number;
  abbreviate?: boolean;
  className?: string;
}

const CurrencyValue: React.FC<CurrencyValueProps> = ({
  value,
  currency = 'USD',
  decimals,
  abbreviate = false,
  className = '',
}) => {
  // Format based on the value range
  const formatValue = () => {
    if (abbreviate) {
      // Abbreviate large numbers
      if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(2)}B`;
      } else if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(2)}M`;
      } else if (value >= 1_000) {
        return `${(value / 1_000).toFixed(2)}K`;
      }
    }
    
    // For small values, use more decimals
    if (value < 0.01 && value > 0) {
      return value.toFixed(6);
    }
    
    // Use specified decimals or default based on value
    const decimalPlaces = decimals !== undefined 
      ? decimals 
      : value >= 1000 
        ? 0 
        : value >= 1 
          ? 2 
          : 4;
    
    return value.toFixed(decimalPlaces);
  };
  
  const formattedValue = formatValue();
  const currencySymbol = currency === 'USD' ? '$' : '';
  
  return (
    <span className={className}>
      {currencySymbol}{formattedValue}
      {currencySymbol === '' && ` ${currency}`}
    </span>
  );
};

export default CurrencyValue; 