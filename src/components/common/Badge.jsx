import React from 'react';

export const Badge = ({
  children,
  color = 'teal',
  size = 'md',
  className = '',
  icon: Icon
}) => {
  const colorMap = {
    teal: 'bg-teal-50 text-teal-700 border-teal-200/70',
    blue: 'bg-sky-50 text-sky-700 border-sky-200/70',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/70',
    rose: 'bg-rose-50 text-rose-700 border-rose-200/70',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200/70'
  };

  const sizeMap = {
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3 py-1.5 font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border tracking-wide uppercase ${colorMap[color] || colorMap.teal} ${sizeMap[size] || sizeMap.md} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      {children}
    </span>
  );
};

export default Badge;
