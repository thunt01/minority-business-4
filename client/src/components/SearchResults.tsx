import React from 'react';
import {useParams} from "react-router-dom";
import {SearchFn} from './Search.tsx';

const SearchResults = () => {
    const searchTag = String(useParams().search_tag);
    return (
        <SearchFn product_name={searchTag} />
    )
}

export default SearchResults;