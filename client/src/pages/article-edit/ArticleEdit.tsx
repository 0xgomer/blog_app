import {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ArticleService from "../../services/ArticleService.ts";
import InputFile from "../../components/UI/inputs/input-file/InputFile.tsx";
import Input from "../../components/UI/inputs/Input/Input.tsx";
import InputTag from "../../components/UI/inputs/input-tag/InputTag.tsx";
import Editor from "../../components/editor/Editor.tsx";
import useFetching from "../../hooks/useFetching.ts";
import {IArticle} from "../../types";
import config from "../../utils/config.ts";
import './article-edit.scss'
import {AxiosError} from "axios";
import {setError, setLoading} from "../../store/slices/alertReducer.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";

type ArticleParams = {
    id: string;
}

const ArticleEdit:FC = () => {
    const dispatch = useAppDispatch()
    const {id = ''} = useParams<ArticleParams>()
    const navigate = useNavigate()
    const [articleName, setArticleName] = useState<string>('')
    const [articlePreview, setArticlePreview] = useState<string | null>(null)
    const [articlePreviewUpload, setArticlePreviewUpload] = useState<File | null>(null)
    const [tags, setTags] = useState<string[]>([])
    const [content, setContent] = useState<string>('')
    const {data: article, isLoading, error, setFetching} = useFetching<IArticle>(() => ArticleService.getOne({id}))

    useEffect(() => {
        setFetching(true)
    }, []);

    useEffect(() => {
        if (article) {
            if (article?.data.preview) setArticlePreview(`${config.serverURL}/${article?.data.preview}`)
            setArticleName(article.data.title)
            setTags(article.data.tags)
            setContent(article.data.content)
        }
    }, [article]);

    useEffect(() => {
        if (articlePreviewUpload) setArticlePreview(URL.createObjectURL(articlePreviewUpload))
    }, [articlePreviewUpload]);

    useEffect(() => {
        if (isLoading) dispatch(setLoading(true))
        else dispatch(setLoading(false))
    }, [isLoading]);

    const formHandler = async () => {
        const userData = new FormData();

        if (articleName) userData.append('title', articleName);
        if (articlePreviewUpload) userData.append('preview', articlePreviewUpload);
        if (tags.length > 0) userData.append('tags', JSON.stringify(tags));
        if (content) userData.append('content', content);


        try {
            if (article) {
                await ArticleService.update({articleId: article.data._id, data: userData})
                navigate(`/article/${article.data._id}`)
            }
        } catch (err) {
            const error = err as AxiosError<{message: string}>;
            dispatch(setError(error?.response?.data.message))
        }
    }

    if (error) dispatch(setError(error.message))

    return (
        <div className={'article-edit'}>
            <div className="container">
                {articlePreview !== null && <div className="article-edit__preview">
                    <img src={articlePreview} alt="preview"/>
                </div>}
                <InputFile name={'Download preview'} setFile={setArticlePreviewUpload} accept={'image/*'}/>
                <Input inputValue={articleName} setInputValue={setArticleName} placeholder={'Article title...'}
                       variant={'large'}/>
                <InputTag tags={tags} setTags={setTags}/>
                <Editor content={content} setContent={setContent}/>
                <div className="article-edit__bottom">
                    <button className={'primary'} onClick={formHandler}>Update</button>
                    <button onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ArticleEdit;