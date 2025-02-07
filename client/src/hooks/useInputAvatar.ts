import React, {useState} from "react";

interface UseInputProps {
    value: File | null;
    setValue: React.Dispatch<React.SetStateAction<File | null>>
}

interface UseInputReturn {
    value: File | null;
    error: string
    handleImageChange: ({currentTarget: {files}}: React.ChangeEvent<HTMLInputElement>) => void;
}

const useInputAvatar = ({value, setValue}: UseInputProps): UseInputReturn => {
    const [error, setError] = useState<string>('')

    const handleImageChange = ({currentTarget: {files}}: React.ChangeEvent<HTMLInputElement>) => {
        if (files && files.length) {
            let file: File = files[0]
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (allowedMimeTypes.includes(file.type)) {
                setValue(file);
                setError('')
            } else {
                setValue(null)
                setError('Invalid file type. Only JPEG, JPG and PNG files are allowed.')
            }
        }
    }

    return {value, error, handleImageChange}
}

export default useInputAvatar