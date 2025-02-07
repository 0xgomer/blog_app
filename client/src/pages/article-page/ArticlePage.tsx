import {FC} from 'react';
import {useParams} from "react-router-dom";
import './article-page.scss'
import ArticleContent from "../../components/article-content/ArticleContent.tsx";
import CommentForm from "../../components/UI/forms/comment-form/CommentForm.tsx";

type ArticleParams = {
    id: string;
}

const ArticlePage:FC = () => {
    const {id = ''} = useParams<ArticleParams>()


    return (
        <div className={'article-page'}>
            <ArticleContent id={id}/>
            <CommentForm id={id}/>
        </div>
    );
};

export default ArticlePage;