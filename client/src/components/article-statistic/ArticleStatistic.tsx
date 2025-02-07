import {FC} from 'react';
import Comment from '../../assets/icons/comment.svg'
import Eye from '../../assets/icons/eye.svg'
import './article-statistic.scss'

interface ArticleStatistic {
    views: number,
    comments: number,
}

const ArticleStatistic:FC<ArticleStatistic> = ({views, comments}) => {
    return (
        <div className={'article-statistic'}>
            <div className="article-statistic__item">
                <Comment/> <p>{comments}</p>
            </div>
            <div className="article-statistic__item">
                <Eye/><p>{views}</p>
            </div>
        </div>
    );
};

export default ArticleStatistic;