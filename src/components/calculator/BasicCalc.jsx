import React from 'react';
import CalcButton from './CalcButton';

const BUTTONS = [
  { label: 'MC', variant: 'function' },
  { label: 'MR', variant: 'function' },
  { label: 'M+', variant: 'function' },
  { label: 'M\u2212', variant: 'function' },
  { label: 'C', variant: 'clear' },
  { label: '(', variant: 'function' },
  { label: ')', variant: 'function' },
  { label: '%', variant: 'operator' },
  { label: '\u00F7', variant: 'operator' },
  { label: '7', variant: 'default' },
  { label: '8', variant: 'default' },
  { label: '9', variant: 'default' },
  { label: '\u00D7', variant: 'operator' },
  { label: '4', variant: 'default' },
  { label: '5', variant: 'default' },
  { label: '6', variant: 'default' },
  { label: '\u2212', variant: 'operator' },
  { label: '1', variant: 'default' },
  { label: '2', variant: 'default' },
  { label: '3', variant: 'default' },
  { label: '+', variant: 'operator' },
  { label: '\u00B1', variant: 'function' },
  { label: '0', variant: 'default' },
  { label: '.', variant: 'default' },
  { label: '=', variant: 'equal' },
];

export default function BasicCalc({ onInput }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {BUTTONS.map((btn) => (
        <CalcButton
          key={btn.label}
          label={btn.label}
          variant={btn.variant}
          onClick={onInput}
        />
      ))}
    </div>
  );
}
