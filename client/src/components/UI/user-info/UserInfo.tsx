import React, {FC} from 'react';
import ImageInputAvatar from "../inputs/image-input-avatar/ImageInputAvatar.tsx";

interface UserItemProps{
    avatar: File | null
    setAvatar: React.Dispatch<React.SetStateAction<File | null>>
    name: string | null
    content: string | null
}

const UserInfo:FC<UserItemProps> = ({avatar, setAvatar, name, content}) => {
    return (
        <div className={'user-info'}>
            <ImageInputAvatar inputValue={avatar} setInputValue={setAvatar}/>
            <div className="user-info__main">
                <span>{name}</span>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default UserInfo;