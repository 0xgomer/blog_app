import {FC, FormEvent, ReactNode} from 'react';
import './form.scss'

interface FormProps {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    formHeader: string;
    buttonText: string;
    children: ReactNode
}

const Form:FC<FormProps> = ({onSubmit, formHeader, buttonText, children}) => {
    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            onSubmit(event)
        }} className={'form'}>
            <h3>{formHeader}</h3>
            <div className="form__inputs">
                {children}
                <button type={'submit'} className={'primary'}>{buttonText}</button>
            </div>
        </form>
    );
};

export default Form;