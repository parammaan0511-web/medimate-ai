import React from 'react';

export const Card = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  padding = 'p-6',
  variant = 'default'
}) => {
  const baseStyles = 'bg-white rounded-2xl transition-all duration-200 border';
  
  const variants = {
    default: 'border-slate-200/90 shadow-xs hover:border-slate-300',
    highlight: 'border-teal-200/80 shadow-xs bg-gradient-to-br from-white via-teal-50/20 to-white',
    subtle: 'border-slate-100 bg-slate-50/50 shadow-none'
  };

  const hoverStyles = hoverable
    ? 'hover:-translate-y-0.5 hover:shadow-md hover:border-teal-300 cursor-pointer'
    : '';

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.default} ${hoverStyles} ${padding} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
