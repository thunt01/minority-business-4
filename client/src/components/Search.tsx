import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Search.css';

interface SearchProps {
    product_name: string;
}

export function SearchFn({ product_name } : SearchProps) {

    const [search_results, setResults] = useState([]);
    useEffect(() => {
        if (product_name.trim() !== '') {
            fetch('/search/products/' + product_name)
            .then((res) => res.json())
            .then((data) => {setResults(data)});
        } else {
            setResults([]);
        }
    }, [product_name]);

    const results = JSON.parse(JSON.stringify(search_results));
    const listItems = results.map((product: any) => (
        <li key={product.Id} className="search-result-item">
            <a href={`/product/${product.ProductID}`}>
                <div>{product.ProductID}</div>
                <div>{product.Name}</div>
                <div>{product.Price}</div>
                <div>{product.Description}</div> 
            </a> 
        </li>
    ));
    return listItems;
};

const Search = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const handleInputChange = (event: any) => {setSearchTerm(event.target.value)};

    const navigate = useNavigate();
    const handleEnter = (event: any) => {if (event.key === 'Enter') {
        navigate("/search/" + searchTerm);
    }};
    
    return (
        <div id="SearchDropdown" class="SearchContent">
            <form id="search">
                <input
                    type="search"
                    placeholder="Search product..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleEnter}
                />
            </form>
            <ul>
                <SearchFn product_name={searchTerm} />
            </ul>
        </div>
    )    
}

export default Search;