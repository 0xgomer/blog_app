import {FC, useEffect, useState} from "react";
import {IArticle} from "../../types";
import ArticleService from "../../services/ArticleService.ts";
import Tabs, {TabsValues} from "../../components/UI/tabs/Tabs.tsx";
import SearchInput from "../../components/UI/inputs/search-input/search-input.tsx";
import ArticleList from "../../components/article-list/ArticleList.tsx";
import useFetching from "../../hooks/useFetching.ts";
import Pagination from "../../components/pagination/Pagination.tsx";
import './main-page.scss'
import {setError, setLoading} from "../../store/slices/alertReducer.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";

const MainPage:FC = () => {
    const dispatch = useAppDispatch()
    const values: Array<TabsValues> = [
        {title: 'New', value: 'date'},
        {title: 'Popular', value: 'views'}
    ]
    const [page, setPage] = useState<number>(1)
    const [limit] = useState<number>(10)
    const [selected, setSelected] = useState<string>(values[0].value)
    const [search, setSearch] = useState<string>('')

    const {data: articles, error, isLoading, setFetching} = useFetching<IArticle[]>(() => ArticleService.getAll({page, limit, sort: selected, search}))

    useEffect(() => {
        setFetching(true)
        setSearch('')
    }, [selected])

    useEffect(() => {
        setFetching(true)
    }, [page])

    useEffect(() => {
        if (isLoading) dispatch(setLoading(true))
        else dispatch(setLoading(false))
    }, [isLoading]);

    const searchHandler = () => {
        setFetching(true)
    }

    if (error) dispatch(setError(error.message))

    return (
        <div className={'main-page'}>
            <div className="main-page__left">
                <div className="main-page__head">
                    <Tabs values={values} selected={selected} setSelected={setSelected}/>
                    <SearchInput search={search} setSearch={setSearch} buttonHandler={searchHandler}/>
                </div>
                <ArticleList articles={articles?.data}/>
                <Pagination page={page} setPage={setPage} limit={limit} totalCount={articles?.headers['x-total-count']}/>
            </div>
        </div>
    );
};

export default MainPage;