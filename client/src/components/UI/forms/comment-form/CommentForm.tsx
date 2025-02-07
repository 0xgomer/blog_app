import {ChangeEvent, FC, useEffect, useState} from 'react';
import {useAppSelector} from "../../../../hooks/useAppSelector.ts";
import {IComment} from "../../../../types";
import CommentsService from "../../../../services/CommentsService.ts";
import UserItem from "../../user-item/UserItem.tsx";
import config from "../../../../utils/config.ts";
import './comment-form.scss'
import {AxiosError} from "axios";
import {setError, setLoading} from "../../../../store/slices/alertReducer.ts";
import {useAppDispatch} from "../../../../hooks/useAppDispatch.ts";

interface CommentFormProps {
    id: string
}

const CommentForm:FC<CommentFormProps> = ({id}) => {
    const dispatch = useAppDispatch()
    const [comment, setComment] = useState<string>('')
    const user = useAppSelector(state => state.user.user)
    const [comments, setComments] = useState<IComment[]>([])
    const [page, setPage] = useState<number>(1)
    const [limit] = useState<number>(10)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [fetching, setFetching] = useState<boolean>(true)

    useEffect(() => {
        if (fetching) {
            CommentsService.get({id, page, limit}).then((response) => {
                setComments([...comments, ...response.data])
                setPage(prevState => prevState + 1)
                setTotalCount(response.headers['x-total-count'])
            }).catch((err: AxiosError<{message: string}>) => {
                dispatch(setError(err?.response?.data?.message))
            }).finally(() => setFetching(false))
        }
    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)

        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [comments]);

    useEffect(() => {
        if (fetching) dispatch(setLoading(true))
        else dispatch(setLoading(false))
    }, [fetching]);

    const scrollHandler = (event: Event) => {
        const target = event.target as Document

        if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < 100 && comments.length < totalCount) {
            setFetching(true)
        }
    }


    const commentSendHandler = async () => {
        if (comment.trim() !== '') {
            try {
                await CommentsService.create({ id, content: comment });
                setComments([])
                setPage(1)
                setTotalCount(0)
                setFetching(true);
            } catch (error) {
                console.error('Error sending comment:', error);
            }finally {
                setComment('');
            }
        }
    }

    // if (isLoading) return <h1>Loading...</h1>
    // if (error) return <h1>{error.message}</h1>

    return (
        <div className={'comment-form'}>
            <h4>Comments</h4>
            {user && <div className="comment-form__form">
                <div className={'comment-form__avatar'}>
                    <img src={`${config.serverURL}/${user?.avatar}`} alt="avatar"/>
                </div>
                <div className="comment-form__input">
                    <input value={comment} onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)} type={'text'}
                           placeholder={'Write a comment'}/>
                    <button className={'primary'} onClick={commentSendHandler}>Send</button>
                </div>
            </div>}
            <div className="comment-form__comments">
                {comments.map(comment => <UserItem avatar={comment.avatar} name={comment.name} content={comment.content} key={comment._id}/>)}
            </div>
        </div>
    );
};

export default CommentForm;