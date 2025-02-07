import {FC, useEffect, useState} from 'react';
import config from "../../utils/config.ts";
import UserItem from "../UI/user-item/UserItem.tsx";
import Tags from "../tags/Tags.tsx";
import ArticleStatistic from "../article-statistic/ArticleStatistic.tsx";
import useFetching from "../../hooks/useFetching.ts";
import {IArticle, IUser} from "../../types";
import ArticleService from "../../services/ArticleService.ts";
import UserService from "../../services/UserService.ts";
import './article-content.scss'
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {setError, setLoading} from "../../store/slices/alertReducer.ts";

interface ArticleContentProps {
    id: string
}

const ArticleContent:FC<ArticleContentProps> = ({id}) => {
    const dispatch = useAppDispatch()
    const {data: article, isLoading, error, setFetching} = useFetching<IArticle>(() => ArticleService.getOne({id}))
    const [user, setUser] = useState<IUser | null>(null)

    useEffect(() => {
        setFetching(true)
    }, [])

    useEffect(() => {
        if (isLoading) dispatch(setLoading(true))
        else dispatch(setLoading(false))
    }, [isLoading]);

    useEffect(() => {
        if (article?.data?.author) {
            const fetchUser = async () => {
                try {
                    const response = await UserService.getUser(article.data.author);
                    setUser(response?.data || null);
                } catch (err) {
                    console.error('Ошибка при загрузке данных пользователя:', err);
                }
            };
            fetchUser();
        }
    }, [article]);


    if (error) dispatch(setError(error.message))

    return (
        <div className={'article-content'}>
            {article && <>
                {article.data.preview && <div className="article-content__preview">
                    <img src={`${config.serverURL}/${article?.data.preview}`}
                         alt="preview"/>
                </div>}
                <div className="article-content__content">
                    <UserItem avatar={user?.avatar ?? null} name={user?.fullName ?? "Unknown User"}
                              content={new Date(article?.data.createdAt).toLocaleDateString('en-US', {
                                   year: 'numeric',
                                   month: 'long',
                                   day: 'numeric'
                               })}/>
                    <h2>{article.data.title}</h2>
                    <Tags tags={article.data.tags}/>
                    <div dangerouslySetInnerHTML={{ __html: article.data.content }} />
                    <ArticleStatistic views={article.data.viewsCount} comments={article.data.commentsCount}/>
                </div>
            </>}
        </div>
    );
};

export default ArticleContent;