import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface PriceChangeProps {
  value: number;
  timeframe?: string;
  showIcon?: boolean;
  className?: string;
}

const PriceChange: React.FC<PriceChangeProps> = ({ 
  value, 
  timeframe,
  showIcon = true,
  className = ''
}) => {
  const isPositive = value >= 0;
  const formattedValue = isPositive ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
  
  const textColorClass = isPositive ? 'text-green-400' : 'text-red-400';
  const allClasses = `${textColorClass} ${className} inline-flex items-center`;
  
  return (
    <span className={allClasses}>
      {showIcon && (
        isPositive 
          ? <ArrowUp className="mr-1 h-3 w-3" /> 
          : <ArrowDown className="mr-1 h-3 w-3" />
      )}
      {formattedValue}
      {timeframe && <span className="ml-1 text-light-gray">({timeframe})</span>}
    </span>
  );
};

export default PriceChange; 