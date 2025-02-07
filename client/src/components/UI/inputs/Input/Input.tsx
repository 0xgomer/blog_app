import React, {FC} from 'react';
import useInput, {validationFn} from "../../../../hooks/useInput.ts";
import './input.scss'
import classNames from "classnames";

interface InputProps {
    placeholder?: string;
    type?: string;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    validator?: validationFn,
    variant?: string
}

const Input:FC<InputProps> = ({placeholder, type, inputValue, setInputValue, validator, variant}) => {
    const {value, error, onChange, handleBlur} = useInput({initialValue: inputValue, validator})

    const cl = classNames({
        'input': true,
        'input--large': variant === 'large',
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        setInputValue(event.target.value);
    };

    return (
        <div className={cl}>
            <input type={type || 'text'} className={(error && 'input__error')} placeholder={placeholder} onChange={handleChange} onBlur={handleBlur} value={value}/>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Input;