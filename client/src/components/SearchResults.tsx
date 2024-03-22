import React from 'react';
import {useParams} from "react-router-dom";
import {SearchFn} from './Search';
import Search from './Search';
import Navbar from './Navbar';

const SearchResults = () => {
    const searchTag = String(useParams().search_tag);
    return (
        <div>
            <Navbar></Navbar>
            <h1>Search Results</h1>
            <form>
                Price range:
                <input type="text" id="low-price" placeholder="Min"></input>
                <input type="text" id="high-price" placeholder="Max"></input>
            </form>
        <SearchFn product_name={searchTag} />
        </div>
    )
}

export default SearchResults;