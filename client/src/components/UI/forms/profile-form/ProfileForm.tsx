import {FC, FormEvent, ReactNode} from 'react';
import {Link} from "react-router-dom";
import './profile-form.scss'

interface ProfileFormProps {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    children: ReactNode
}

const ProfileForm:FC<ProfileFormProps> = ({onSubmit, children}) => {
    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            onSubmit(event)
        }} className={'profile-form'}>
            <div className="profile-form__inputs">
                {children}
                <div className="profile-form__buttons">
                    <button type={'submit'} className={'primary'}>Save</button>
                    <button><Link to={'/'}>Cancel</Link></button>
                </div>
            </div>
        </form>
    );
};

export default ProfileForm;