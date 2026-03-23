import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Moon, Palette, Sun } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import { evaluateExpression, CalculatorMemory } from '@/lib/calculatorEngine';
import CalcDisplay from '@/components/calculator/CalcDisplay';
import BasicCalc from '@/components/calculator/BasicCalc';
import ScientificCalc from '@/components/calculator/ScientificCalc';
import UnitConverterPanel from '@/components/calculator/UnitConverterPanel';
import CurrencyPanel from '@/components/calculator/CurrencyPanel';
import HistoryPanel from '@/components/calculator/HistoryPanel';
import ThemePanel from '@/components/calculator/ThemePanel';
import TabBar from '@/components/calculator/TabBar';

const memory = new CalculatorMemory();

export default function Calculator() {
  const { isDark, toggle: toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('basic');
  const [expression, setExpression] = useState('');
  const [displayResult, setDisplayResult] = useState('0');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const [isRadians, setIsRadians] = useState(true);
  const [justEvaluated, setJustEvaluated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('calc-theme');
    if (!saved) return;

    const parsed = JSON.parse(saved);
    const root = document.documentElement;
    Object.entries({
      '--calc-bg': parsed.theme.calcBg,
      '--calc-display': parsed.theme.calcDisplay,
      '--calc-btn': parsed.theme.calcBtn,
      '--calc-btn-op': parsed.theme.calcBtnOp,
      '--calc-text': parsed.theme.calcText,
      '--calc-text-muted': parsed.theme.calcTextMuted,
      '--primary': parsed.theme.primary,
      '--accent': parsed.theme.accent,
      '--calc-btn-fn': parsed.theme.calcBtn,
      '--calc-glass': parsed.theme.calcBg,
    }).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, []);

  const handleEvaluate = useCallback(() => {
    if (!expression) return;
    const result = evaluateExpression(expression, isRadians);
    setDisplayResult(result);
    setHistory((prev) => [{ expression, result }, ...prev].slice(0, 50));
    setJustEvaluated(true);
  }, [expression, isRadians]);

  const handleInput = useCallback((label) => {
    const startsNewExpr = justEvaluated && /^[0-9.]$/.test(label);

    switch (label) {
      case 'C':
        setExpression('');
        setDisplayResult('0');
        setJustEvaluated(false);
        return;
      case '=':
        handleEvaluate();
        return;
      case '\u00B1': {
        if (justEvaluated && displayResult !== '0' && displayResult !== 'Error') {
          const negated = displayResult.startsWith('-') ? displayResult.slice(1) : `-${displayResult}`;
          setExpression(negated);
          setDisplayResult(negated);
        } else {
          setExpression((prev) => (prev.startsWith('-') ? prev.slice(1) : `-${prev}`));
        }
        return;
      }
      case '%':
        setExpression((prev) => prev + '%');
        setJustEvaluated(false);
        return;
      case 'MC':
        memory.clear();
        return;
      case 'MR': {
        const value = memory.recall().toString();
        setExpression((prev) => (startsNewExpr ? value : prev + value));
        setDisplayResult(value);
        setJustEvaluated(false);
        return;
      }
      case 'M+':
        memory.add(displayResult === 'Error' ? 0 : parseFloat(displayResult));
        return;
      case 'M\u2212':
        memory.subtract(displayResult === 'Error' ? 0 : parseFloat(displayResult));
        return;
      case 'sin':
      case 'cos':
      case 'tan':
      case 'asin':
      case 'acos':
      case 'atan':
      case 'log':
      case 'ln':
      case 'abs':
        setExpression((prev) => (startsNewExpr ? `${label}(` : prev + `${label}(`));
        setJustEvaluated(false);
        return;
      case '\u221A':
        setExpression((prev) => (startsNewExpr ? '\u221A(' : prev + '\u221A('));
        setJustEvaluated(false);
        return;
      case '\u221B':
        setExpression((prev) => (startsNewExpr ? '\u221B(' : prev + '\u221B('));
        setJustEvaluated(false);
        return;
      case 'x^y':
        setExpression((prev) => prev + '^');
        setJustEvaluated(false);
        return;
      case 'x!':
        setExpression((prev) => prev + '!');
        setJustEvaluated(false);
        return;
      case '|x|':
        setExpression((prev) => (startsNewExpr ? 'abs(' : prev + 'abs('));
        setJustEvaluated(false);
        return;
      case 'EXP':
        setExpression((prev) => prev + 'e');
        setJustEvaluated(false);
        return;
      case '\u03C0':
      case 'e':
        setExpression((prev) => (startsNewExpr ? label : prev + label));
        setJustEvaluated(false);
        return;
      case '\u2212':
        setExpression((prev) => (justEvaluated ? displayResult : prev) + '-');
        setJustEvaluated(false);
        return;
      default:
        if (startsNewExpr) {
          setExpression(label);
        } else if (justEvaluated && /^[+\-\u00D7\u00F7^]$/.test(label)) {
          setExpression(displayResult + label);
        } else {
          setExpression((prev) => prev + label);
        }
        setJustEvaluated(false);
    }
  }, [displayResult, handleEvaluate, justEvaluated]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (activeTab !== 'basic' && activeTab !== 'scientific') return;

      const keyMap = {
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '.': '.',
        '+': '+',
        '-': '\u2212',
        '*': '\u00D7',
        '/': '\u00F7',
        '(': '(',
        ')': ')',
        '%': '%',
        Enter: '=',
        '=': '=',
        Backspace: 'BACK',
        Escape: 'C',
        Delete: 'C',
      };

      const mapped = keyMap[event.key];
      if (mapped === 'BACK') {
        event.preventDefault();
        setExpression((prev) => prev.slice(0, -1));
        setJustEvaluated(false);
      } else if (mapped) {
        event.preventDefault();
        handleInput(mapped);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, handleInput]);

  const handleHistorySelect = (item) => {
    setExpression(item.expression);
    setDisplayResult(item.result);
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animated-bg">
      <div
        className="w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
        style={{
          background: 'hsl(var(--calc-bg))',
          border: '1px solid hsl(var(--calc-text) / 0.06)',
        }}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              style={{ color: 'hsl(var(--calc-text-muted))' }}
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-lg font-bold tracking-tight" style={{ color: 'hsl(var(--calc-text))' }}>
              Omni<span style={{ color: 'hsl(var(--primary))' }}>Con</span>
            </h1>
          </div>
          <div className="flex gap-1">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-white/5 transition-colors"
              style={{ color: 'hsl(var(--calc-text-muted))' }}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setShowHistory(!showHistory);
                setShowTheme(false);
              }}
              className="p-2 rounded-xl hover:bg-white/5 transition-colors"
              style={{ color: showHistory ? 'hsl(var(--primary))' : 'hsl(var(--calc-text-muted))' }}
            >
              <Clock className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setShowTheme(!showTheme);
                setShowHistory(false);
              }}
              className="p-2 rounded-xl hover:bg-white/5 transition-colors"
              style={{ color: showTheme ? 'hsl(var(--primary))' : 'hsl(var(--calc-text-muted))' }}
            >
              <Palette className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="px-4 pb-5">
          {showHistory && (
            <HistoryPanel
              history={history}
              onClear={() => setHistory([])}
              onSelect={handleHistorySelect}
              onClose={() => setShowHistory(false)}
            />
          )}

          {showTheme && <ThemePanel onClose={() => setShowTheme(false)} />}

          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

          {(activeTab === 'basic' || activeTab === 'scientific') && (
            <CalcDisplay
              expression={expression}
              result={displayResult}
              memory={memory.recall()}
            />
          )}

          {activeTab === 'basic' && <BasicCalc onInput={handleInput} />}
          {activeTab === 'scientific' && (
            <ScientificCalc
              onInput={handleInput}
              isRadians={isRadians}
              onToggleAngle={setIsRadians}
            />
          )}
          {activeTab === 'converter' && <UnitConverterPanel />}
          {activeTab === 'currency' && <CurrencyPanel />}
        </div>
      </div>
    </div>
  );
}
