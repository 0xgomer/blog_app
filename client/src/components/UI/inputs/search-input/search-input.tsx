import React, {FC} from 'react';
import Search from "../../../../assets/icons/search.svg";
import './search-input.scss'

interface SearchInputProps {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
    buttonHandler: () => void
}

const SearchInput:FC<SearchInputProps> = ({search, setSearch, buttonHandler}) => {
    return (
        <div className={'search-input'}>
            <input placeholder={'Search...'} type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <button className={'primary'} onClick={buttonHandler}><Search/></button>
        </div>
    );
};

export default SearchInput;