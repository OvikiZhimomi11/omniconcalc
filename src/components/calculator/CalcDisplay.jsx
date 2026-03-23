import React from 'react';

export default function CalcDisplay({ expression, result, memory }) {
  return (
    <div className="rounded-2xl p-5 mb-4" style={{ background: 'hsl(var(--calc-display))' }}>
      {memory !== 0 && (
        <div className="text-xs font-mono mb-1" style={{ color: 'hsl(var(--primary))' }}>
          M = {memory}
        </div>
      )}
      <div 
        className="text-right text-sm font-mono min-h-[1.5rem] truncate"
        style={{ color: 'hsl(var(--calc-text-muted))' }}
      >
        {expression || '\u00A0'}
      </div>
      <div 
        className="text-right text-4xl font-mono font-semibold mt-1 truncate display-animate"
        style={{ color: 'hsl(var(--calc-text))' }}
      >
        {result || '0'}
      </div>
    </div>
  );
}