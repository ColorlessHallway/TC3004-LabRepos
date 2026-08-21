import { useState } from 'react';
import PropTypes from 'prop-types';

interface CounterAppProps {
  value: number;
}

export const CounterApp = ({ value }: CounterAppProps) => {
  const [counter, setCounter] = useState<number>(value);

  const handleAdd = (): void => {
    setCounter(counter + 1);
  };

  const handleSubtract = (): void => {
    setCounter(counter - 1);
  };

  const handleReset = (): void => {
    setCounter(value);
  };

  return (
    <>
      <h1>CounterApp</h1>
      <h2> { value } </h2>
      <h3> { counter } </h3>

      <button onClick={ handleAdd }>+1</button>
      <button onClick={ handleSubtract }>-1</button>
      <button onClick={ handleReset }>Reset</button>
    </>
  );
};

// PropTypes opcional si ya usas TypeScript, pero incluido para cumplir con la regla explícita
CounterApp.propTypes = {
  value: PropTypes.number.isRequired,
};