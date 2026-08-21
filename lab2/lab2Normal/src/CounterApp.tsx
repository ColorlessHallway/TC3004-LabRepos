import { useState } from 'react'
import PropTypes from 'prop-types'
//Posible error falso con instalacion de prop-types. Funciona bien.

export const CounterApp = ({ value = 0}) => {
    const [counter, setCounter] = useState(value);

    const handleAdd = () => {
        setCounter(counter + 1);
    };

    const handleSubstract = () => {
        setCounter(counter - 1);
    };

    return (
        <div>
            <h1>CounterApp</h1>
            <h2> {value} </h2>
            <h3> {counter} </h3>
            <button onClick={handleAdd}>+1</button>
            <button onClick={handleSubstract}>-1</button>
        </div>
    )
}

CounterApp.propTypes = {
    value: PropTypes.number.isRequired,
};