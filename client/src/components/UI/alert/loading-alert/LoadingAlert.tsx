import {FC, useEffect} from 'react';
import './loading-alert.scss'

const LoadingAlert:FC = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden"

        return function () {
            document.body.style.overflow = "auto"
        }
    }, []);

    return (
        <div className={'loading-alert'}>
            <div className="loading-alert__content">
                <div className="loading-alert__spinner"></div>
            </div>
        </div>
    );
};

export default LoadingAlert;