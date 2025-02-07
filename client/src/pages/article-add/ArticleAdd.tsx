import {FC, useState} from 'react';
import Input from "../../components/UI/inputs/Input/Input.tsx";
import InputFile from "../../components/UI/inputs/input-file/InputFile.tsx";
import InputTag from "../../components/UI/inputs/input-tag/InputTag.tsx";
import {useNavigate} from "react-router-dom";
import Editor from "../../components/editor/Editor.tsx";
import ArticleService from "../../services/ArticleService.ts";
import './article-add.scss'
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {setError} from "../../store/slices/alertReducer.ts";
import {AxiosError} from "axios";

const ArticleAdd:FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [articleName, setArticleName] = useState<string>('')
    const [articlePreview, setArticlePreview] = useState<File | null>(null)
    const [tags, setTags] = useState<string[]>([])
    const [content, setContent] = useState<string>('')

    const formHandler = async () => {
        const userData = new FormData();

        if (articleName) userData.append('title', articleName);
        if (articlePreview) userData.append('preview', articlePreview);
        if (tags.length > 0) userData.append('tags', JSON.stringify(tags)); // Save tags as a JSON string
        if (content) userData.append('content', content);


        try {
            const article = await ArticleService.create({data: userData})
            navigate(`/article/${article.data._id}`)
        } catch (err) {
            const error = err as AxiosError<{message: string}>;
            dispatch(setError(error?.response?.data.message))
        }
    }

    return (
        <div className={'article-add'}>
            <div className="container">
                {articlePreview !== null && <div className="article-add__preview">
                    <img src={URL.createObjectURL(articlePreview)} alt="preview"/>
                </div>}
                <InputFile name={'Download preview'} setFile={setArticlePreview} accept={'image/*'}/>
                <Input inputValue={articleName} setInputValue={setArticleName} placeholder={'Article title...'} variant={'large'}/>
                <InputTag tags={tags} setTags={setTags}/>
                <Editor content={content} setContent={setContent}/>
                <div className="article-add__bottom">
                    <button className={'primary'} onClick={formHandler}>Publish</button>
                    <button onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ArticleAdd;