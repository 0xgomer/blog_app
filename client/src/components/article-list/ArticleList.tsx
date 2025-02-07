import {FC} from 'react';
import {IArticle} from "../../types";
import Article from "../article/Article.tsx";
import './article-list.scss'

interface ArticleListProps {
    articles: Array<IArticle> | undefined;
}

const ArticleList:FC<ArticleListProps> = ({articles}) => {
    return (
        <div className={'article-list'}>
            {articles?.map(article => <Article key={article._id} article={article}/>)}
        </div>
    );
};

export default ArticleList;