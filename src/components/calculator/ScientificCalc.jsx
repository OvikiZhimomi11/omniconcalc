import React from 'react';
import CalcButton from './CalcButton';

const SCI_ROW1 = [
  { label: 'sin', variant: 'function' },
  { label: 'cos', variant: 'function' },
  { label: 'tan', variant: 'function' },
  { label: '\u03C0', variant: 'function' },
  { label: 'e', variant: 'function' },
];

const SCI_ROW2 = [
  { label: 'asin', variant: 'function' },
  { label: 'acos', variant: 'function' },
  { label: 'atan', variant: 'function' },
  { label: 'x!', variant: 'function' },
  { label: '|x|', variant: 'function' },
];

const SCI_ROW3 = [
  { label: 'log', variant: 'function' },
  { label: 'ln', variant: 'function' },
  { label: '\u221A', variant: 'function' },
  { label: '\u221B', variant: 'function' },
  { label: 'x^y', variant: 'function' },
];

const NUM_ROWS = [
  [
    { label: 'C', variant: 'clear' },
    { label: '(', variant: 'function' },
    { label: ')', variant: 'function' },
    { label: '%', variant: 'operator' },
    { label: '\u00F7', variant: 'operator' },
  ],
  [
    { label: '7', variant: 'default' },
    { label: '8', variant: 'default' },
    { label: '9', variant: 'default' },
    { label: '\u00D7', variant: 'operator' },
    { label: '\u2212', variant: 'operator' },
  ],
  [
    { label: '4', variant: 'default' },
    { label: '5', variant: 'default' },
    { label: '6', variant: 'default' },
    { label: '+', variant: 'operator' },
    { label: 'EXP', variant: 'function' },
  ],
  [
    { label: '1', variant: 'default' },
    { label: '2', variant: 'default' },
    { label: '3', variant: 'default' },
    { label: '.', variant: 'default' },
    { label: '=', variant: 'equal' },
  ],
];

export default function ScientificCalc({ onInput, isRadians, onToggleAngle }) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => onToggleAngle(true)}
          className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{
            background: isRadians ? 'hsl(var(--calc-btn-op))' : 'hsl(var(--calc-btn))',
            color: isRadians ? 'white' : 'hsl(var(--calc-text-muted))',
          }}
        >
          RAD
        </button>
        <button
          onClick={() => onToggleAngle(false)}
          className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{
            background: !isRadians ? 'hsl(var(--calc-btn-op))' : 'hsl(var(--calc-btn))',
            color: !isRadians ? 'white' : 'hsl(var(--calc-text-muted))',
          }}
        >
          DEG
        </button>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {SCI_ROW1.map((btn) => (
          <CalcButton key={btn.label} label={btn.label} variant={btn.variant} onClick={onInput} className="h-10 text-xs" />
        ))}
        {SCI_ROW2.map((btn) => (
          <CalcButton key={btn.label} label={btn.label} variant={btn.variant} onClick={onInput} className="h-10 text-xs" />
        ))}
        {SCI_ROW3.map((btn) => (
          <CalcButton key={btn.label} label={btn.label} variant={btn.variant} onClick={onInput} className="h-10 text-xs" />
        ))}
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {NUM_ROWS.flat().map((btn, i) => (
          <CalcButton key={`${btn.label}-${i}`} label={btn.label} variant={btn.variant} onClick={onInput} className="h-12 text-sm" />
        ))}
        <CalcButton label="0" variant="default" onClick={onInput} className="h-12 text-sm col-span-2" span={2} />
        <CalcButton label={'\u00B1'} variant="function" onClick={onInput} className="h-12 text-sm" />
        <CalcButton label="MC" variant="function" onClick={onInput} className="h-12 text-xs" />
        <CalcButton label="MR" variant="function" onClick={onInput} className="h-12 text-xs" />
      </div>
    </div>
  );
}
