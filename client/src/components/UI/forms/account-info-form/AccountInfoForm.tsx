import {FC, useState} from 'react';
import {emailValidator, fullNameValidator} from "../../../../utils/validation.ts";
import {useAppSelector} from "../../../../hooks/useAppSelector.ts";
import UserItem from "../../user-item/UserItem.tsx";
import Input from "../../inputs/Input/Input.tsx";
import ProfileForm from "../profile-form/ProfileForm.tsx";
import UserService from "../../../../services/UserService.ts";
import {AxiosError} from "axios";
import {IError} from "../../../../types";
import {refreshUser} from "../../../../store/slices/userReducer.ts";
import {useAppDispatch} from "../../../../hooks/useAppDispatch.ts";
import {setError} from "../../../../store/slices/alertReducer.ts";

const AccountInfoForm:FC = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.user)
    const [fullName, setFullName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [err, setErr] = useState<string | null>(null)

    const formHandler = async () => {
        const userData = new FormData();

        if (fullName) userData.append('fullName', fullName);
        if (email) userData.append('email', email);

        try {
            await UserService.editUser(userData)
            dispatch(refreshUser())
        } catch (err) {
            setErr(((err as AxiosError).response?.data as IError).message)
        }
    }

    if (err) {
        dispatch(setError(err))
        setErr('')
    }

    return (
        <div className={'account-info-form'}>
            <ProfileForm onSubmit={() => formHandler()}>
                <UserItem avatar={user?.avatar || null} name={user?.fullName || null} content={user?.email || null}/>
                <Input inputValue={fullName} setInputValue={setFullName} placeholder={'Full name'} validator={fullNameValidator}/>
                <Input inputValue={email} setInputValue={setEmail} placeholder={'E-mail'} validator={emailValidator}/>
            </ProfileForm>
        </div>
    );
};

export default AccountInfoForm;