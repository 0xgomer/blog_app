import {FC} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './tags.scss'

interface TagsProps{
    tags: Array<string>
}

const Tags:FC<TagsProps> = ({tags}) => {
    return (
        <div className={'tags'}>
            {tags.map(tag => <p key={uuidv4()}>#{tag}</p>)}
        </div>
    );
};

export default Tags;