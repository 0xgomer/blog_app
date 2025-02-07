import {FC, useEffect} from 'react';
import './success-alert.scss'
import {useAppDispatch} from "../../../../hooks/useAppDispatch.ts";
import {closeSuccess} from "../../../../store/slices/alertReducer.ts";
import Success from "../../../../assets/icons/success.svg";

interface SuccessAlertProps {
    message: string;
}

const SuccessAlert:FC<SuccessAlertProps> = ({message}) => {
    const dispatch = useAppDispatch()

    const btnHandler = () => {
        dispatch(closeSuccess())
    }

    useEffect(() => {
        document.body.style.overflow = "hidden"

        return function () {
            document.body.style.overflow = "auto"
        }
    }, []);

    return (
        <div className={'success-alert'}>
            <div className="success-alert__content">
                <div className="success-alert__img">
                    <Success/>
                </div>
                <div className="success-alert__message">
                    <h3>Success</h3>
                    <p>{message}</p>
                </div>
                <button className={'primary'} onClick={btnHandler}>Continue</button>
            </div>
        </div>
    );
};

export default SuccessAlert;