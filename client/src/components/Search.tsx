import React, { useState, useEffect } from 'react';

interface SearchProps {
    product_name: string;
}

function Search({ product_name } : SearchProps) {

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
    const listItems = results.map((product: any) =>
        <div>
            <li>{product.Name}</li>
            <li>{product.Price}</li>
            <li>{product.Description}</li>
        </div>
    );
    return listItems;
};

export default Search;