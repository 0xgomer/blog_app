import {FC, useEffect} from 'react';
import {useAppDispatch} from "../../../../hooks/useAppDispatch.ts";
import {closeError} from "../../../../store/slices/alertReducer.ts";
import Error from '../../../../assets/icons/error.svg'
import './error-alert.scss'

interface ErrorAlertProps {
    message: string;
}

const ErrorAlert:FC<ErrorAlertProps> = ({message}) => {
    const dispatch = useAppDispatch()

    const btnHandler = () => {
        dispatch(closeError())
    }

    useEffect(() => {
        document.body.style.overflow = "hidden"

        return function () {
            document.body.style.overflow = "auto"
        }
    }, []);

    return (
        <div className={'error-alert'}>
            <div className="error-alert__content">
                <div className="error-alert__img">
                    <Error/>
                </div>
                <div className="error-alert__message">
                    <h3>Error</h3>
                    <p>{message}</p>
                </div>
                <button className={'primary'} onClick={btnHandler}>Close</button>
            </div>
        </div>
    );
};

export default ErrorAlert;