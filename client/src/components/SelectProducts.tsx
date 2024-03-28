import React from "react";
import { useState, useEffect } from "react";

const SelectProducts = () => {
    const [search_results, setResults] = useState([]);
    useEffect(() => {
        fetch('/business')
            .then((res) => res.json())
            .then((data) => {setResults(data.result)});
    }, []);
    const results = JSON.parse(JSON.stringify(search_results));
    const listItems = results.map((product: any) => (
        <li key={product.Id} className="search-result-item">
            <a href={`/products/${product.BusinessID}`}>
                <ul>
                <li>{product.Name}</li>
                <li>{product.Price}</li>
                <li>{product.Description}</li> 
                </ul>
            </a> 
        </li>
    ));
    return (
        <div>
            
            
            <h1>Featured</h1>

            <h1>Featured Products</h1>
            

            <h1>Browsing</h1>
            {listItems}
        </div>
    );

}

export default SelectProducts;