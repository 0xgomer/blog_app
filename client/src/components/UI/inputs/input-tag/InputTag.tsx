import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import './input-tag.scss'
import TagItem from "../../tag-item/TagItem.tsx";

interface InputTagProps {
    tags: string[],
    setTags: React.Dispatch<React.SetStateAction<string[]>>,
}

const InputTag:FC<InputTagProps> = ({tags, setTags}) => {
    const [tag, setTag] = useState<string>('')
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        const inputElement = inputRef.current;

        if (inputElement) {
            inputElement.addEventListener('keydown', inputHandler);

            return () => {
                inputElement.removeEventListener('keydown', inputHandler);
            };
        }
    }, [tag]);

    const inputHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            setTags(prevTags => {
                if (!prevTags.includes(tag.trim()) && tag.trim() !== '') {
                    return [...prevTags, tag.trim()];
                }
                return prevTags;
            });
            setTag('')
        }
    };

    const handleDelete = (tagToDelete: string) => {
        setTags(prevTags => prevTags.filter(tag => tag !== tagToDelete));
    };


    return (
        <div className={'input-tag'}>
            <div className="input-tag__list">
                {tags.map(tag => <TagItem key={tag} tag={tag} onClick={handleDelete} />)}
                <input value={tag} onChange={(e: ChangeEvent<HTMLInputElement>) => setTag(e.target.value)} placeholder={'Enter tag...'} ref={inputRef}/>
            </div>
        </div>
    );
};

export default InputTag;