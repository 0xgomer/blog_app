import React, {FC} from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import './editor.scss'

interface EditorProps {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

const Editor:FC<EditorProps> = ({content, setContent}) => {
    const modules = {
        toolbar: [
            ["bold", "italic", "underline"],
            [{ 'header': '2' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ["blockquote"],
            [{ 'align': [] }],
            ["link", "image"]
        ]
    };

    const handleProcedureContentChange = (content: string) => {
        setContent(content);
    }


    return (
        <div className={'editor'}>
            <ReactQuill
                theme="snow"
                value={content}
                onChange={handleProcedureContentChange}
                modules={modules}
            />
        </div>
    );
};

export default Editor;