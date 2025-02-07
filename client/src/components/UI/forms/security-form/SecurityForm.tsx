import {FC, useState} from 'react';
import Input from "../../inputs/Input/Input.tsx";
import {passwordValidator} from "../../../../utils/validation.ts";
import ProfileForm from "../profile-form/ProfileForm.tsx";
import UserService from "../../../../services/UserService.ts";
import {AxiosError} from "axios";
import {IError} from "../../../../types";
import {setError} from "../../../../store/slices/alertReducer.ts";
import {useAppDispatch} from "../../../../hooks/useAppDispatch.ts";

const SecurityForm:FC = () => {
    const dispatch = useAppDispatch()
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [err, setErr] = useState<string | null>(null)

    const formHandler = async () => {
        const userData = new FormData();

        if (password && password === confirmPassword) userData.append('password', password);

        try {
            if (password && password === confirmPassword) {
                await UserService.editUser(userData)
            }
            else {setErr('passwords do not match')}
        } catch (err) {
            setErr(((err as AxiosError).response?.data as IError).message)
        }finally {
            setPassword('')
            setConfirmPassword('')
        }
    }

    if (err) {
        dispatch(setError(err))
        setErr('')
    }

    return (
        <ProfileForm onSubmit={() => formHandler()}>
            <Input type={'password'} inputValue={password} setInputValue={setPassword} placeholder={'Password'} validator={passwordValidator}/>
            <Input type={'password'} inputValue={confirmPassword} setInputValue={setConfirmPassword} placeholder={'Confirm password'}/>
        </ProfileForm>
    );
};

export default SecurityForm;