import {FC, useEffect, useRef, useState} from "react";
import {IArticle, IUser} from "../../types";
import useFetching from "../../hooks/useFetching.ts";
import UserService from "../../services/UserService.ts";
import config from "../../utils/config.ts";
import UserItem from "../UI/user-item/UserItem.tsx";
import Tags from "../tags/Tags.tsx";
import ArticleStatistic from "../article-statistic/ArticleStatistic.tsx";
import Edit from '../../assets/icons/edit.svg'
import Remove from '../../assets/icons/remove.svg'
import './article.scss'
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {NavLink, useNavigate} from "react-router-dom";
import ArticleService from "../../services/ArticleService.ts";
import {setError, setLoading} from "../../store/slices/alertReducer.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";

interface ArticleProps {
    article: IArticle
}

const Article:FC<ArticleProps> = ({article}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const articleRef = useRef<HTMLAnchorElement | null>(null);
    const {data: user, error, isLoading, setFetching} = useFetching<IUser>(() => UserService.getUser(article.author))
    const getMe: IUser | null = useAppSelector(state => state.user.user)
    const [editable, setEditable] = useState<boolean>(false)

    useEffect(() => {
        setFetching(true)
    }, [])

    useEffect(() => {
        if (!isLoading && article.author === getMe?.id) {
            setEditable(true)
        }

        if (isLoading) dispatch(setLoading(true))
        else dispatch(setLoading(false))
    }, [isLoading]);

    useEffect(() => {
        const handleMouseOver = () => {
            articleRef.current?.classList.add('active');
        };
        const handleMouseLeave = () => {
            articleRef.current?.classList.remove('active');
        };

        if (editable && articleRef.current) {
            const currentRef = articleRef.current;
            currentRef.addEventListener('mouseover', handleMouseOver);
            currentRef.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                currentRef.removeEventListener('mouseover', handleMouseOver);
                currentRef.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [editable]);

    const deleteHandler = async () => {
        await ArticleService.delete({id: article._id})
        navigate(0)
    }

    if (error) dispatch(setError(error))

    return (
        <NavLink className={'article' + ` ${article.preview ? 'article--preview' : ''}`} to={`/article/${article._id}`} ref={articleRef}
                 onMouseOver={() => articleRef?.current?.classList.add('active')}
                 onMouseLeave={() => articleRef?.current?.classList.remove('active')}
                onClick={(e) => {
                    if ((e.target as HTMLElement).closest('.article__edit')) {
                        e.preventDefault();
                    }
                }}
        >
            {editable &&
                <div className="article__edit">
                    <NavLink to={`/article-edit/${article._id}`}><Edit/></NavLink>
                    <div onClick={deleteHandler}><Remove/></div>
                </div>
            }
            <div className="article__preview">
                {article.preview &&
                    <img className={'article__preview'} src={`${config.serverURL}/${article.preview}`} alt="preview"/>}
            </div>
            <div className="article__content">
                {user && <UserItem avatar={user.data.avatar} name={getMe?.id === article.author ? 'You' : user.data.fullName}
                                   content={new Date(article.createdAt).toLocaleDateString('en-US', {
                                       year: 'numeric',
                                       month: 'long',
                                       day: 'numeric'
                                   })}/>}
                <h2>{article.title}</h2>
                <Tags tags={article.tags}/>
                <ArticleStatistic views={article.viewsCount} comments={article.commentsCount}/>
            </div>
        </NavLink>
    );
};

export default Article;