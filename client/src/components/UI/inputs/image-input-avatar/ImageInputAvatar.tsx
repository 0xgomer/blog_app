import React, {FC, useRef} from 'react';
import useInputAvatar from "../../../../hooks/useInputAvatar.ts";
import Avatar from '../../../../assets/icons/avatar.svg'
import './image-input-avatar.scss'

interface ImageInputAvatarProps {
    inputValue: File | null;
    setInputValue: React.Dispatch<React.SetStateAction<File | null>>;
}

const ImageInputAvatar:FC<ImageInputAvatarProps> = ({inputValue, setInputValue}) => {
    const {value, error, handleImageChange} = useInputAvatar({value: inputValue, setValue: setInputValue})
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <label className={'image-input-avatar'} htmlFor={inputRef?.current?.id}>
            <div className={"image-input-avatar__wrapper" + (error && ' error')}>
                <div className="image-input-avatar__avatar">
                    {value ? <img src={URL.createObjectURL(value)} alt={'avatar__preview'}/> : <Avatar/>}
                </div>
            </div>
            {error && <span className={'image-input-avatar__message'}>{error}</span>}
            <input type="file" ref={inputRef} id={'image-input-avatar'} accept={'image/png, image/jpeg, image/jpg'} onChange={(event) => handleImageChange(event)}/>
        </label>
    );
};

export default ImageInputAvatar;