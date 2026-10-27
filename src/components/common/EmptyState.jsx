import React from 'react';
import { Sparkles } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Sparkles,
  title,
  description,
  badgeText,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
  children
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 bg-white rounded-2xl border border-dashed border-slate-300">
      <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-4 shadow-xs">
        <Icon className="w-7 h-7" />
      </div>

      {badgeText && (
        <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/60 mb-2">
          {badgeText}
        </span>
      )}

      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 max-w-md">
        {title}
      </h3>

      <p className="text-sm md:text-base text-slate-500 max-w-lg mb-6 leading-relaxed">
        {description}
      </p>

      {children}

      {(actionText || secondaryActionText) && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          {actionText && (
            <button
              onClick={onAction}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-medium text-sm rounded-xl transition-all shadow-xs hover:shadow-sm"
            >
              {actionText}
            </button>
          )}
          {secondaryActionText && (
            <button
              onClick={onSecondaryAction}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-xl transition-all"
            >
              {secondaryActionText}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
