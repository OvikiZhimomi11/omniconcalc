import React, { useState, useEffect } from 'react';
import { Palette, RotateCcw, X } from 'lucide-react';

const DEFAULT_THEME = {
  calcBg: '230 30% 14%',
  calcDisplay: '230 30% 10%',
  calcBtn: '230 20% 22%',
  calcBtnOp: '252 80% 55%',
  calcText: '0 0% 95%',
  calcTextMuted: '230 15% 55%',
  primary: '252 80% 55%',
  accent: '280 70% 55%',
};

const PRESETS = [
  { name: 'Default', theme: DEFAULT_THEME },
  {
    name: 'Ocean',
    theme: {
      calcBg: '200 40% 12%', calcDisplay: '200 40% 8%', calcBtn: '200 30% 20%',
      calcBtnOp: '195 80% 45%', calcText: '0 0% 95%', calcTextMuted: '200 20% 50%',
      primary: '195 80% 45%', accent: '170 70% 45%',
    },
  },
  {
    name: 'Rose',
    theme: {
      calcBg: '340 25% 14%', calcDisplay: '340 25% 10%', calcBtn: '340 15% 22%',
      calcBtnOp: '340 70% 55%', calcText: '0 0% 95%', calcTextMuted: '340 15% 50%',
      primary: '340 70% 55%', accent: '320 60% 55%',
    },
  },
  {
    name: 'Emerald',
    theme: {
      calcBg: '160 30% 12%', calcDisplay: '160 30% 8%', calcBtn: '160 20% 20%',
      calcBtnOp: '155 70% 40%', calcText: '0 0% 95%', calcTextMuted: '160 15% 50%',
      primary: '155 70% 40%', accent: '140 60% 45%',
    },
  },
  {
    name: 'Amber',
    theme: {
      calcBg: '30 25% 12%', calcDisplay: '30 25% 8%', calcBtn: '30 15% 20%',
      calcBtnOp: '35 80% 50%', calcText: '0 0% 95%', calcTextMuted: '30 15% 50%',
      primary: '35 80% 50%', accent: '15 70% 55%',
    },
  },
  {
    name: 'Light',
    theme: {
      calcBg: '0 0% 95%', calcDisplay: '0 0% 100%', calcBtn: '0 0% 88%',
      calcBtnOp: '252 80% 55%', calcText: '0 0% 10%', calcTextMuted: '0 0% 45%',
      primary: '252 80% 55%', accent: '280 70% 55%',
    },
  },
];

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty('--calc-bg', theme.calcBg);
  root.style.setProperty('--calc-display', theme.calcDisplay);
  root.style.setProperty('--calc-btn', theme.calcBtn);
  root.style.setProperty('--calc-btn-op', theme.calcBtnOp);
  root.style.setProperty('--calc-text', theme.calcText);
  root.style.setProperty('--calc-text-muted', theme.calcTextMuted);
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--calc-btn-fn', theme.calcBtn);
  root.style.setProperty('--calc-glass', theme.calcBg);
}

export default function ThemePanel({ onClose }) {
  const [activePreset, setActivePreset] = useState('Default');

  useEffect(() => {
    const saved = localStorage.getItem('calc-theme');
    if (saved) {
      const parsed = JSON.parse(saved);
      applyTheme(parsed.theme);
      setActivePreset(parsed.name);
    }
  }, []);

  const selectPreset = (preset) => {
    applyTheme(preset.theme);
    setActivePreset(preset.name);
    localStorage.setItem('calc-theme', JSON.stringify(preset));
  };

  const handleReset = () => {
    selectPreset(PRESETS[0]);
  };

  return (
    <div className="glass-panel rounded-2xl p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <span className="text-sm font-medium" style={{ color: 'hsl(var(--calc-text))' }}>Theme</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: 'hsl(var(--calc-text-muted))' }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: 'hsl(var(--calc-text-muted))' }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => selectPreset(preset)}
            className="p-2 rounded-xl text-center transition-all"
            style={{
              background: activePreset === preset.name ? 'hsl(var(--calc-btn-op) / 0.2)' : 'hsl(var(--calc-btn))',
              border: activePreset === preset.name ? '1px solid hsl(var(--primary))' : '1px solid transparent',
            }}
          >
            <div className="flex justify-center gap-1 mb-1.5">
              <div className="w-4 h-4 rounded-full" style={{ background: `hsl(${preset.theme.calcBg})` }} />
              <div className="w-4 h-4 rounded-full" style={{ background: `hsl(${preset.theme.calcBtnOp})` }} />
              <div className="w-4 h-4 rounded-full" style={{ background: `hsl(${preset.theme.calcBtn})` }} />
            </div>
            <span className="text-xs" style={{ color: 'hsl(var(--calc-text))' }}>{preset.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
