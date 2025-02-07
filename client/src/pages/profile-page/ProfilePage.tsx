import {FC, useState} from 'react';
import Tabs, {TabsValues} from "../../components/UI/tabs/Tabs.tsx";
import AccountInfoForm from "../../components/UI/forms/account-info-form/AccountInfoForm.tsx";
import SecurityForm from "../../components/UI/forms/security-form/SecurityForm.tsx";
import ArticleForm from "../../components/UI/forms/article-form/ArticleForm.tsx";
import './profile-page.scss'

const ProfilePage:FC = () => {
    const values: Array<TabsValues> = [
        {title: 'Account information', value: 'info'},
        {title: 'Security', value: 'security'},
        {title: 'Articles', value: 'articles'}
    ]
    const [selected, setSelected] = useState<string>(values[0].value)

    return (
        <div className={'profile-page'}>
            <Tabs values={values} selected={selected} setSelected={setSelected}/>
            <div className="profile-page__content">
                {selected === 'info' && <AccountInfoForm/>}
                {selected === 'security' && <SecurityForm/>}
                {selected === 'articles' && <ArticleForm/>}
            </div>
        </div>
    );
};

export default ProfilePage;