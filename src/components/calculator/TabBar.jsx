import React from 'react';
import { Calculator, FlaskConical, ArrowLeftRight, Coins } from 'lucide-react';

const TABS = [
  { key: 'basic', label: 'Basic', icon: Calculator },
  { key: 'scientific', label: 'Scientific', icon: FlaskConical },
  { key: 'converter', label: 'Converter', icon: ArrowLeftRight },
  { key: 'currency', label: 'Currency', icon: Coins },
];

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <div className="relative flex rounded-xl p-1 mb-4" style={{ background: 'hsl(var(--calc-btn))' }}>
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all relative z-10"
            style={{
              color: isActive ? 'white' : 'hsl(var(--calc-text-muted))',
              background: isActive ? 'hsl(var(--calc-btn-op))' : 'transparent',
              boxShadow: isActive ? '0 2px 10px hsl(var(--primary) / 0.3)' : 'none',
            }}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}