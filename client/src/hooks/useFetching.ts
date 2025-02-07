import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

type RequestFunction<T> = () => Promise<AxiosResponse<T>>;

interface UseFetchingResult<T> {
    data: AxiosResponse<T> | null; // Тип данных вместо полного AxiosResponse
    error: AxiosError | null;
    isLoading: boolean;
    fetching?: boolean;
    setFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

const useFetching = <T,>(request: RequestFunction<T>): UseFetchingResult<T> => {
    const [data, setData] = useState<AxiosResponse<T> | null>(null); // Хранить только данные ответа
    const [error, setError] = useState<AxiosError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fetching, setFetching] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await request();
                setData(response); // Сохраняем только данные
            } catch (error) {
                setError(error as AxiosError);
            } finally {
                setFetching(false);
                setIsLoading(false);
            }
        };

        if (fetching) fetchData();
    }, [fetching]);

    return { data, error, isLoading, fetching, setFetching };
};

export default useFetching;