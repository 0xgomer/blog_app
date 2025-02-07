import {FC} from 'react';
import config from "../../../utils/config.ts";
import './user-item.scss'

interface UserItemProps{
    avatar: string | null
    name: string | null
    content: string | null
}

const UserItem:FC<UserItemProps> = ({avatar, name, content}) => {
    return (
        <div className={'user-item'}>
            <img src={`${config.serverURL}/${avatar}`} alt="avatar"/>
            <div className="user-item__main">
                <span>{name}</span>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default UserItem;