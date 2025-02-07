import {Outlet} from "react-router-dom";
import Header from "./components/header/header.tsx";
import {useEffect} from "react";
import {useAppDispatch} from "./hooks/useAppDispatch.ts";
import {refreshUser} from "./store/slices/userReducer.ts";
import {useAppSelector} from "./hooks/useAppSelector.ts";
import ErrorAlert from "./components/UI/alert/error-alert/ErrorAlert.tsx";
import LoadingAlert from "./components/UI/alert/loading-alert/LoadingAlert.tsx";

const App = () => {
    const dispatch = useAppDispatch()
    const {error, loading} = useAppSelector(state => state.alert)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(refreshUser())
        }
    }, [])

    return (
        <div className={'App'}>
            <Header/>
            <div className="container">
                <Outlet/>
            </div>
            {error && <ErrorAlert message={error}/>}
            {loading && <LoadingAlert/>}
        </div>
    );
};

export default App;