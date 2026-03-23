import React, { useState, useEffect, useCallback } from 'react';
import { ArrowDownUp, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { getCurrencyList, getMockRates, fetchLiveRates, convertCurrency } from '@/lib/currencyData';
import { Input } from '@/components/ui/input';

const currencies = getCurrencyList();

function CurrencySelect({ value, onChange }) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = currencies.filter(c =>
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const selected = currencies.find(c => c.code === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 p-2.5 rounded-lg text-left text-sm transition-colors"
        style={{ background: 'hsl(var(--calc-btn))', color: 'hsl(var(--calc-text))' }}
      >
        <span className="font-semibold text-base">{selected?.symbol}</span>
        <span className="font-medium">{value}</span>
        <span className="text-xs truncate flex-1" style={{ color: 'hsl(var(--calc-text-muted))' }}>
          {selected?.name}
        </span>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-1 w-full rounded-xl shadow-2xl border overflow-hidden"
          style={{ background: 'hsl(var(--calc-bg))', borderColor: 'hsl(var(--calc-text) / 0.1)' }}
        >
          <div className="p-2">
            <input
              type="text"
              placeholder="Search currency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 rounded-lg text-sm outline-none"
              style={{ background: 'hsl(var(--calc-btn))', color: 'hsl(var(--calc-text))' }}
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto custom-scrollbar">
            {filtered.map(c => (
              <button
                key={c.code}
                onClick={() => { onChange(c.code); setOpen(false); setSearch(''); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                style={{ color: 'hsl(var(--calc-text))' }}
              >
                <span className="w-8 font-semibold">{c.symbol}</span>
                <span className="font-medium w-10">{c.code}</span>
                <span className="text-xs truncate" style={{ color: 'hsl(var(--calc-text-muted))' }}>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CurrencyPanel() {
  const [rates, setRates] = useState(getMockRates());
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromValue, setFromValue] = useState('1');
  const [result, setResult] = useState('');

  const loadRates = async () => {
    setLoading(true);
    const liveRates = await fetchLiveRates();
    if (liveRates) {
      setRates(liveRates);
      setIsLive(true);
    }
    setLoading(false);
  };

  useEffect(() => { loadRates(); }, []);

  const doConvert = useCallback(() => {
    const val = parseFloat(fromValue);
    if (isNaN(val)) { setResult(''); return; }
    const r = convertCurrency(val, fromCurrency, toCurrency, rates);
    if (isNaN(r)) { setResult('N/A'); return; }
    setResult(r < 0.01 ? r.toExponential(4) : r.toLocaleString(undefined, { maximumFractionDigits: 4 }));
  }, [fromValue, fromCurrency, toCurrency, rates]);

  useEffect(() => { doConvert(); }, [doConvert]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="space-y-4">
      {/* Status bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          {isLive ? (
            <Wifi className="w-3.5 h-3.5" style={{ color: 'hsl(120 60% 50%)' }} />
          ) : (
            <WifiOff className="w-3.5 h-3.5" style={{ color: 'hsl(var(--calc-text-muted))' }} />
          )}
          <span className="text-xs" style={{ color: 'hsl(var(--calc-text-muted))' }}>
            {isLive ? 'Live rates' : 'Mock rates'}
          </span>
        </div>
        <button
          onClick={loadRates}
          disabled={loading}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
          style={{ color: 'hsl(var(--calc-text-muted))' }}
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* From */}
      <div className="rounded-xl p-4 space-y-2" style={{ background: 'hsl(var(--calc-display))' }}>
        <CurrencySelect value={fromCurrency} onChange={setFromCurrency} />
        <Input
          type="number"
          value={fromValue}
          onChange={(e) => setFromValue(e.target.value)}
          className="border-none text-right text-2xl font-mono font-semibold h-12 rounded-lg"
          style={{ background: 'transparent', color: 'hsl(var(--calc-text))' }}
        />
      </div>

      {/* Swap */}
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
        <CurrencySelect value={toCurrency} onChange={setToCurrency} />
        <div
          className="text-right text-2xl font-mono font-semibold h-12 flex items-center justify-end px-3 rounded-lg"
          style={{ color: 'hsl(var(--primary))' }}
        >
          {result || '0'}
        </div>
      </div>

      {/* Rate info */}
      {fromValue && result && (
        <div className="text-center text-xs" style={{ color: 'hsl(var(--calc-text-muted))' }}>
          1 {fromCurrency} = {convertCurrency(1, fromCurrency, toCurrency, rates)?.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toCurrency}
        </div>
      )}
    </div>
  );
}