import {FC, FormEvent, useEffect, useState} from 'react';
import Form from "../../components/UI/forms/form/Form.tsx";
import Input from "../../components/UI/inputs/Input/Input.tsx";
import {emailValidator, fullNameValidator, passwordValidator} from "../../utils/validation.ts";
import ImageInputAvatar from "../../components/UI/inputs/image-input-avatar/ImageInputAvatar.tsx";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {clearError, registrationUser} from "../../store/slices/userReducer.ts";
import './registration-page.scss'
import {setError, setLoading} from "../../store/slices/alertReducer.ts";
import {useNavigate} from "react-router-dom";


const RegistrationPage:FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { error, loading, user, isLogin} = useAppSelector(state => state.user)
    const [avatar, setAvatar] = useState<File | null>(null)
    const [fullName, setFullName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    useEffect(() => {
        if (user && !error) navigate('/')
    }, [isLogin])

    useEffect(() => {
        if (loading) dispatch(setLoading(true))
        else dispatch(setLoading(false))
    }, [loading]);

    const formHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let formData = new FormData();

        formData.append('avatar', (avatar ? avatar : ''));
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('password', password);

        dispatch(registrationUser({data: formData}))
    }


    if (error) {
        dispatch(setError(error))
        dispatch(clearError())
    }

    return (
        <div className={'registration-page'}>
            <Form buttonText={'Log In'} onSubmit={formHandler} formHeader={'Register an account'}>
                <ImageInputAvatar inputValue={avatar} setInputValue={setAvatar}/>
                <Input placeholder={'Full name'} type={'text'} inputValue={fullName} setInputValue={setFullName} validator={fullNameValidator}/>
                <Input placeholder={'E-mail'} type={'email'} inputValue={email} setInputValue={setEmail} validator={emailValidator}/>
                <Input placeholder={'Password'} type={'password'} inputValue={password} setInputValue={setPassword} validator={passwordValidator}/>
            </Form>
        </div>
    );
};

export default RegistrationPage;