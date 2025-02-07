import React, {FC, useEffect} from "react";
import './pagination.scss'

interface PaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    limit: number;
    totalCount: number;
}

const Pagination:FC<PaginationProps> = ({page, setPage, limit, totalCount}) => {
    const totalCountPages: number = Math.ceil(totalCount/limit)
    const pageNumbers: number[] = []

    for (let i = 0; i < totalCountPages; i++) {
        pageNumbers.push(i + 1)
    }

    const prevHandler = () => {
        setPage((prev) => prev - 1)
    }
    const nextHandler = () => {
        setPage((prev) => prev + 1)
    }

    useEffect(() => {
        if (page <  1) setPage(1)
        if (page >  totalCountPages) setPage(totalCountPages)
    }, [page]);

    return (
        <div className={'pagination'}>
            <button className={'primary'} onClick={prevHandler} disabled={(page ===  1)}>{'<'}</button>
            <div className="pagination__pages">
                {
                    pageNumbers.map(num => <button key={num} className={(page === num ? 'primary' : '')} onClick={() => setPage(num)}>{num}</button>)
                }
            </div>
            <button className={'primary'} onClick={nextHandler} disabled={(page === totalCountPages)}>{'>'}</button>
        </div>
    );
};

export default Pagination;