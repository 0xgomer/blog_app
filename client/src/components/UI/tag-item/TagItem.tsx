import {FC} from 'react';
import Hashtag from '../../../assets/icons/hashtag.svg'
import './tag-item.scss'

interface TagItemProps {
    tag: string
    onClick: (tagToDelete: string) => void;
}

const TagItem:FC<TagItemProps> = ({tag, onClick}) => {
    return (
        <div className={'tag-item'} onClick={() => onClick(tag)}>
            <Hashtag/>
            <p>{tag}</p>
        </div>
    );
};

export default TagItem;