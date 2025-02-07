import {FC, FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {clearError, loginUser} from "../../store/slices/userReducer.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {emailValidator, isEmptyValidator} from "../../utils/validation.ts";
import Form from "../../components/UI/forms/form/Form.tsx";
import Input from "../../components/UI/inputs/Input/Input.tsx";
import './login-page.scss'
import {setError, setLoading} from "../../store/slices/alertReducer.ts";

const LoginPage:FC = () => {
    const dispatch = useAppDispatch()
    const {isLogin, user, error, loading} = useAppSelector(state => state.user)
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const formHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        dispatch(loginUser({email, password}))
    }

    useEffect(() => {
        if (user && !error) navigate('/')
    }, [isLogin])

    useEffect(() => {
        if (loading) dispatch(setLoading(true))
        else dispatch(setLoading(false))
    }, [loading]);

    if (error) {
        dispatch(setError(error))
        dispatch(clearError())
    }

    return (
        <div className={'login-page'}>
            <Form buttonText={'Log In'} onSubmit={formHandler} formHeader={'Sign in to the account'}>
                <Input placeholder={'E-mail'} type={'email'} inputValue={email} setInputValue={setEmail} validator={emailValidator}/>
                <Input placeholder={'Password'} type={'password'} inputValue={password} setInputValue={setPassword} validator={isEmptyValidator}/>
            </Form>
        </div>
    );
};

export default LoginPage;