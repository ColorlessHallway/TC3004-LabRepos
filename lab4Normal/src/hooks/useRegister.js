import { useState } from 'react';

export const useRegister = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm);
    const [submittedData, setSubmittedData] = useState(null);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleRegister = () => {
        setSubmittedData({ ...formState });
    };

    return {
        ...formState,
        formState,
        submittedData,
        onInputChange,
        handleRegister
    };
};