import React from 'react';
import { cn } from '@/lib/utils';

export default function CalcButton({ label, onClick, variant = 'default', className = '', span = 1 }) {
  const baseStyles = "calc-btn rounded-xl font-semibold text-sm h-14 flex items-center justify-center select-none cursor-pointer";
  
  const variants = {
    default: "hover:brightness-125",
    operator: "hover:brightness-110",
    function: "hover:brightness-125",
    equal: "hover:brightness-110 glow-primary",
    clear: "hover:brightness-125",
  };

  const bgStyles = {
    default: { background: 'hsl(var(--calc-btn))' },
    operator: { background: 'hsl(var(--calc-btn-op))' },
    function: { background: 'hsl(var(--calc-btn-fn))' },
    equal: { background: 'hsl(var(--calc-btn-op))' },
    clear: { background: 'hsl(344 80% 45%)' },
  };

  const textStyles = {
    default: { color: 'hsl(var(--calc-text))' },
    operator: { color: 'hsl(0 0% 100%)' },
    function: { color: 'hsl(var(--calc-text-muted))' },
    equal: { color: 'hsl(0 0% 100%)' },
    clear: { color: 'hsl(0 0% 100%)' },
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      style={{
        ...bgStyles[variant],
        ...textStyles[variant],
        gridColumn: span > 1 ? `span ${span}` : undefined,
      }}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
}