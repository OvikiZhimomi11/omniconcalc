import React, { useState, useEffect, useCallback } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { getCategories, getUnits, convert, formatResult } from '@/lib/unitConverter';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function UnitConverterPanel() {
  const categories = getCategories();
  const [category, setCategory] = useState('length');
  const [units, setUnits] = useState(getUnits('length'));
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [fromValue, setFromValue] = useState('1');
  const [result, setResult] = useState('');

  useEffect(() => {
    const u = getUnits(category);
    setUnits(u);
    if (u.length >= 2) {
      setFromUnit(u[0].key);
      setToUnit(u[1].key);
    }
    setFromValue('1');
  }, [category]);

  const doConvert = useCallback(() => {
    const val = parseFloat(fromValue);
    if (isNaN(val)) { setResult(''); return; }
    const r = convert(category, val, fromUnit, toUnit);
    setResult(formatResult(r));
  }, [category, fromValue, fromUnit, toUnit]);

  useEffect(() => { doConvert(); }, [doConvert]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="space-y-4">
      {/* Category selector */}
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="border-none h-12 rounded-xl text-sm font-medium" style={{ background: 'hsl(var(--calc-btn))', color: 'hsl(var(--calc-text))' }}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map(c => (
            <SelectItem key={c.key} value={c.key}>{c.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* From */}
      <div className="rounded-xl p-4 space-y-2" style={{ background: 'hsl(var(--calc-display))' }}>
        <Select value={fromUnit} onValueChange={setFromUnit}>
          <SelectTrigger className="border-none h-10 rounded-lg text-xs" style={{ background: 'hsl(var(--calc-btn))', color: 'hsl(var(--calc-text))' }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {units.map(u => (
              <SelectItem key={u.key} value={u.key}>{u.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          value={fromValue}
          onChange={(e) => setFromValue(e.target.value)}
          className="border-none text-right text-2xl font-mono font-semibold h-12 rounded-lg"
          style={{ background: 'transparent', color: 'hsl(var(--calc-text))' }}
        />
      </div>

      {/* Swap button */}
      <div className="flex justify-center">
        <button
          onClick={handleSwap}
          className="p-3 rounded-full transition-all hover:scale-110 active:scale-95"
          style={{ background: 'hsl(var(--calc-btn-op))', color: 'white' }}
        >
          <ArrowDownUp className="w-5 h-5" />
        </button>
      </div>

      {/* To */}
      <div className="rounded-xl p-4 space-y-2" style={{ background: 'hsl(var(--calc-display))' }}>
        <Select value={toUnit} onValueChange={setToUnit}>
          <SelectTrigger className="border-none h-10 rounded-lg text-xs" style={{ background: 'hsl(var(--calc-btn))', color: 'hsl(var(--calc-text))' }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {units.map(u => (
              <SelectItem key={u.key} value={u.key}>{u.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div
          className="text-right text-2xl font-mono font-semibold h-12 flex items-center justify-end px-3 rounded-lg"
          style={{ color: 'hsl(var(--primary))' }}
        >
          {result || '0'}
        </div>
      </div>
    </div>
  );
}