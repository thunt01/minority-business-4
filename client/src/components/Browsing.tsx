import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Business from './Business';

const Product = () => {
    const [search_results, setResults] = useState([]);
    useEffect(() => {
        fetch('/products')
            .then((res) => res.json())
            .then((data) => {setResults(data.result)});
    }, []);
    const results = JSON.parse(JSON.stringify(search_results));
    
    
    
    const listItems = results.map((product: any) => (
        <li key={product.Id}>
            <a href={`/product/${product.ProductID}`}>
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
            <Navbar></Navbar>
            <Search></Search>
            
            <h1>Featured</h1>

            <h1>Featured Products</h1>
            

            <h1>Browsing</h1>
            {listItems}
        </div>
    );
}

export default Product;