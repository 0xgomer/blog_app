import {ChangeEvent, useEffect, useState} from "react";

export type validationFn = (value: string) => string | undefined;

interface UseInputProps {
    initialValue: string;
    validator?: validationFn
}

interface UseInputReturn {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleBlur: () => void;
    error: string
}

const useInput = ({initialValue, validator}: UseInputProps):UseInputReturn => {
    const [value, setValue] = useState<string>(initialValue)
    const [error, setError] = useState<string>('')
    const [touched, setTouched] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setValue(newValue)
        setTouched(false);
    }

    useEffect(() => {
        setValue(initialValue); 
    }, [initialValue]);

    useEffect(() => {
        if (touched && validator && typeof validator === 'function'){
            const errorMessage = validator(value)
            setError(errorMessage || '')
        }
    }, [value, touched, validator])

    const handleBlur = () => {
        setTouched(true); 
    };

    return {value, error, onChange: handleChange, handleBlur}
}

export default useInput
