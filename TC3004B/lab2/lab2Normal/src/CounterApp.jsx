import { useState } from 'react'
import PropTypes from 'prop-types'

export const CounterApp = ({ value = 0}) => {
    const [counter, setCounter] = useState(value);

    const useAdd = () => {
        setCounter(counter + 1);
    };

    const useSubstract = () => {
        setCounter(counter - 1);
    };

    return (
        <div>
            <h1>CounterApp</h1>
            <h2> {value} </h2>
            <h3> {counter} </h3>
            <button onClick={useAdd}>+1</button>
            <button onClick={useSubstract}>-1</button>
        </div>
    )
}

CounterApp.propTypes = {
    value: PropTypes.number.isRequired,
};