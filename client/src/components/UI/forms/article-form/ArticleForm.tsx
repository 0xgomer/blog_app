import {FC, useEffect, useState} from 'react';
import ArticleList from "../../../article-list/ArticleList.tsx";
import Pagination from "../../../pagination/Pagination.tsx";
import useFetching from "../../../../hooks/useFetching.ts";
import {IArticle} from "../../../../types";
import ArticleService from "../../../../services/ArticleService.ts";
import './article-form.scss'
import {useAppDispatch} from "../../../../hooks/useAppDispatch.ts";
import {setError, setLoading} from "../../../../store/slices/alertReducer.ts";

const ArticleForm:FC = () => {
    const dispatch = useAppDispatch()
    const {data: articles, error, isLoading, setFetching} = useFetching<IArticle[]>(() => ArticleService.getMy({page, limit}))
    const [page, setPage] = useState<number>(1)
    const [limit] = useState<number>(10)


    useEffect(() => {
        setFetching(true)
    }, [page])

    useEffect(() => {
        if (isLoading) dispatch(setLoading(true))
        else dispatch(setLoading(false))
    }, [isLoading]);

    if (error) dispatch(setError(error.message))

    return (
        <div className={'article-form'}>
            <ArticleList articles={articles?.data}/>
            <Pagination page={page} setPage={setPage} limit={limit} totalCount={articles?.headers['x-total-count']}/>
        </div>
    );
};

export default ArticleForm;