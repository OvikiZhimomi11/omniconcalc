import React from 'react';
import { Clock, Trash2, X } from 'lucide-react';

export default function HistoryPanel({ history, onClear, onSelect, onClose }) {
  return (
    <div className="glass-panel rounded-2xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" style={{ color: 'hsl(var(--calc-text-muted))' }} />
          <span className="text-sm font-medium" style={{ color: 'hsl(var(--calc-text))' }}>History</span>
        </div>
        <div className="flex gap-1">
          {history.length > 0 && (
            <button
              onClick={onClear}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              style={{ color: 'hsl(var(--calc-text-muted))' }}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: 'hsl(var(--calc-text-muted))' }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1.5">
        {history.length === 0 ? (
          <p className="text-xs text-center py-4" style={{ color: 'hsl(var(--calc-text-muted))' }}>
            No calculations yet
          </p>
        ) : (
          history.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(item)}
              className="w-full text-right p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="text-xs truncate" style={{ color: 'hsl(var(--calc-text-muted))' }}>
                {item.expression}
              </div>
              <div className="text-sm font-mono font-medium" style={{ color: 'hsl(var(--calc-text))' }}>
                = {item.result}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
