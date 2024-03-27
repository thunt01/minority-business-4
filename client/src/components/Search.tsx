import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import './Search.css';

interface SearchProps {
    product_name: string;
    sort_by: string;
}

export function SearchFn({ product_name, sort_by } : SearchProps) {

    const [search_results, setResults] = useState([]);
    useEffect(() => {
        if (product_name.trim() !== '') {
            fetch('/search/products/' + product_name + '/' + sort_by)
            .then((res) => res.json())
            .then((data) => {setResults(data)});
        } else {
            setResults([]);
        }
    }, [product_name, sort_by]);

    const results = JSON.parse(JSON.stringify(search_results));
    const listItems = results.map((product: any) => (
        <li key={product.Id} className="search-result-item">
            <a href={`/product/${product.ProductID}`}>
                <ul>
                <li>{product.Name}</li>
                <li>{product.Price}</li>
                <li>{product.Description}</li> 
                </ul>
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
        <div>
            <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <ul>
                    <form id="search">
                        
                        <input
                            type="search"
                            placeholder="Search product..."
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyDown={handleEnter}
                        />
                    </form>
                    
                </ul>
            </div>
            {searchTerm && (
                <div className="search-result">
                    <ul>
                    <SearchFn product_name={searchTerm} sort_by='dsc' />
                    </ul>
                </div>
            )}
        </div>
    )    
}

export default Search;