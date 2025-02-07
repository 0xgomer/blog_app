import React, {FC} from 'react';
import './input-file.scss'

interface inputFileProps {
    name: string,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    accept: string,
}

const InputFile:FC<inputFileProps> = ({name, setFile, accept}) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
        }
    }

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Имитируем клик по input
        }
    }

    return (
        <div className={'input-file'}>
            <label htmlFor="file-upload"><button onClick={handleButtonClick}>{name}</button></label>
            <input
                ref={fileInputRef}
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept={accept}
            />
        </div>
    );
};

export default InputFile;