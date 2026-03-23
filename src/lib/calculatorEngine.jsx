// Calculator Engine - handles expression evaluation and memory

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity;
  let result = 1;
  for (let i = 2; i <= n; i += 1) result *= i;
  return result;
}

export function evaluateExpression(expr, isRadians = true) {
  let processed = expr
    .replace(/\u00D7/g, '*')
    .replace(/\u00F7/g, '/')
    .replace(/\u03C0/g, `(${Math.PI})`)
    .replace(/e(?![xp])/g, `(${Math.E})`)
    .replace(/\^/g, '**');

  processed = processed.replace(/(\d+)!/g, (_, n) => factorial(parseInt(n, 10)));

  const trigFns = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'];
  trigFns.forEach((fn) => {
    const regex = new RegExp(`${fn}\\(`, 'g');
    if (fn.startsWith('a')) {
      processed = processed.replace(regex, isRadians ? `Math.${fn}(` : `(Math.${fn}(`);
      if (!isRadians && (fn === 'asin' || fn === 'acos' || fn === 'atan')) {
        processed = processed.replace(
          new RegExp(`\\(Math\\.${fn}\\(`, 'g'),
          `(${RAD_TO_DEG}*Math.${fn}(`
        );
      }
    } else if (isRadians) {
      processed = processed.replace(regex, `Math.${fn}(`);
    } else {
      processed = processed.replace(regex, `Math.${fn}(${DEG_TO_RAD}*`);
    }
  });

  processed = processed.replace(/log\(/g, 'Math.log10(');
  processed = processed.replace(/ln\(/g, 'Math.log(');
  processed = processed.replace(/\u221A\(/g, 'Math.sqrt(');
  processed = processed.replace(/\u221B\(/g, 'Math.cbrt(');
  processed = processed.replace(/abs\(/g, 'Math.abs(');
  processed = processed.replace(/(\d+\.?\d*)%/g, '($1/100)');

  const result = new Function(`"use strict"; return (${processed})`)();

  if (typeof result !== 'number' || !Number.isFinite(result)) {
    if (result === Infinity) return 'Infinity';
    if (result === -Infinity) return '-Infinity';
    return 'Error';
  }

  if (Number.isInteger(result) && Math.abs(result) < 1e15) {
    return result.toString();
  }

  return parseFloat(result.toPrecision(12)).toString();
}

export class CalculatorMemory {
  constructor() {
    this.value = 0;
  }

  clear() {
    this.value = 0;
  }

  recall() {
    return this.value;
  }

  add(val) {
    this.value += parseFloat(val) || 0;
  }

  subtract(val) {
    this.value -= parseFloat(val) || 0;
  }
}
