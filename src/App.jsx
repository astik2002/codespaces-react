// ScientificCalculator.jsx
import React, { useState } from 'react';
import './App.css';

const ScientificCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [isRadians, setIsRadians] = useState(true);
  const [isInverse, setIsInverse] = useState(false);
  const [isHyperbolic, setIsHyperbolic] = useState(false);

  const handleNumber = (num) => {
    if (display === '0' || shouldResetDisplay) {
      setDisplay(num.toString());
      setShouldResetDisplay(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (operator) => {
    setEquation(display + ' ' + operator);
    setShouldResetDisplay(true);
  };

  const calculateResult = () => {
    if (!equation) return display;

    const [num1, operator] = equation.split(' ');
    const num2 = display;

    switch (operator) {
      case '+': return (parseFloat(num1) + parseFloat(num2)).toString();
      case '-': return (parseFloat(num1) - parseFloat(num2)).toString();
      case '×': return (parseFloat(num1) * parseFloat(num2)).toString();
      case '÷': return parseFloat(num2) !== 0 ? (parseFloat(num1) / parseFloat(num2)).toString() : 'Error';
      case '^': return Math.pow(parseFloat(num1), parseFloat(num2)).toString();
      default: return display;
    }
  };

  const handleScientificFunction = (func) => {
    const num = parseFloat(display);
    let result;

    switch (func) {
      // Trigonometric Functions
      case 'sin':
        result = isInverse 
          ? (isRadians ? Math.asin(num) : Math.asin(num) * 180 / Math.PI)
          : Math.sin(isRadians ? num : num * Math.PI / 180);
        break;
      case 'cos':
        result = isInverse 
          ? (isRadians ? Math.acos(num) : Math.acos(num) * 180 / Math.PI)
          : Math.cos(isRadians ? num : num * Math.PI / 180);
        break;
      case 'tan':
        result = isInverse 
          ? (isRadians ? Math.atan(num) : Math.atan(num) * 180 / Math.PI)
          : Math.tan(isRadians ? num : num * Math.PI / 180);
        break;

      // Logarithmic Functions
      case 'log':
        result = isInverse ? Math.pow(10, num) : Math.log10(num);
        break;
      case 'ln':
        result = isInverse ? Math.exp(num) : Math.log(num);
        break;

      // Power Functions
      case 'square':
        result = isInverse ? Math.sqrt(num) : Math.pow(num, 2);
        break;
      case 'cube':
        result = isInverse ? Math.cbrt(num) : Math.pow(num, 3);
        break;
      case '10^x':
        result = Math.pow(10, num);
        break;

      // Special Functions
      case 'factorial':
        result = factorial(num);
        break;
      case 'π':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      case '1/x':
        result = 1 / num;
        break;
      case 'abs':
        result = Math.abs(num);
        break;

      default:
        result = num;
    }
    setDisplay(result.toString());
    setShouldResetDisplay(true);
  };

  const factorial = (n) => {
    if (n < 0) return 'Error';
    if (n === 0) return 1;
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const handleMemory = (operation) => {
    const currentValue = parseFloat(display);
    switch (operation) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(memory.toString());
        break;
      case 'M+':
        setMemory(memory + currentValue);
        break;
      case 'M-':
        setMemory(memory - currentValue);
        break;
      default:
        break;
    }
  };

  return (
    <div className="scientific-calculator">
      <div className="calculator-display">
        <div className="mode-indicators">
          <span className={isRadians ? 'active' : ''}>RAD</span>
          <span className={!isRadians ? 'active' : ''}>DEG</span>
          <span className={isInverse ? 'active' : ''}>INV</span>
          <span className={isHyperbolic ? 'active' : ''}>HYP</span>
        </div>
        <div className="equation">{equation}</div>
        <div className="display">{display}</div>
      </div>

      <div className="calculator-buttons">
        {/* Mode toggles */}
        <button onClick={() => setIsRadians(!isRadians)} className="function-btn">
          RAD/DEG
        </button>
        <button onClick={() => setIsInverse(!isInverse)} className="function-btn">
          INV
        </button>
        <button onClick={() => setIsHyperbolic(!isHyperbolic)} className="function-btn">
          HYP
        </button>
        <button onClick={() => handleScientificFunction('π')} className="function-btn">
          π
        </button>

        {/* Memory functions */}
        <button onClick={() => handleMemory('MC')} className="memory-btn">MC</button>
        <button onClick={() => handleMemory('MR')} className="memory-btn">MR</button>
        <button onClick={() => handleMemory('M+')} className="memory-btn">M+</button>
        <button onClick={() => handleMemory('M-')} className="memory-btn">M-</button>

        {/* Scientific functions */}
        <button onClick={() => handleScientificFunction('sin')}>sin</button>
        <button onClick={() => handleScientificFunction('cos')}>cos</button>
        <button onClick={() => handleScientificFunction('tan')}>tan</button>
        <button onClick={() => handleScientificFunction('log')}>log</button>
        <button onClick={() => handleScientificFunction('ln')}>ln</button>
        <button onClick={() => handleScientificFunction('square')}>x²</button>
        <button onClick={() => handleScientificFunction('cube')}>x³</button>
        <button onClick={() => handleScientificFunction('1/x')}>1/x</button>

        {/* Numbers and basic operators */}
        <button onClick={() => handleNumber(7)}>7</button>
        <button onClick={() => handleNumber(8)}>8</button>
        <button onClick={() => handleNumber(9)}>9</button>
        <button onClick={() => handleOperator('÷')}>÷</button>

        <button onClick={() => handleNumber(4)}>4</button>
        <button onClick={() => handleNumber(5)}>5</button>
        <button onClick={() => handleNumber(6)}>6</button>
        <button onClick={() => handleOperator('×')}>×</button>

        <button onClick={() => handleNumber(1)}>1</button>
        <button onClick={() => handleNumber(2)}>2</button>
        <button onClick={() => handleNumber(3)}>3</button>
        <button onClick={() => handleOperator('-')}>-</button>

        <button onClick={() => handleNumber(0)}>0</button>
        <button onClick={() => handleNumber('.')}>.</button>
        <button onClick={() => {
          const result = calculateResult();
          setDisplay(result);
          setEquation('');
        }}>=</button>
        <button onClick={() => handleOperator('+')}>+</button>
      </div>
    </div>
  );
};

export default ScientificCalculator;