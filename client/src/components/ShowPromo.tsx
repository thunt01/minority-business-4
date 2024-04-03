import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import App from "../App";

// get the products 
const ShowPromo = () => {


    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Make the API call when the component mounts
        axios.get('/getpromo')
            .then((response) => {
                
                
                setProducts(JSON.parse(JSON.stringify(response.data.result)));
                console.log('products successfully fetched');
                
            })
            .catch(error => {
                // Handle any errors
                console.error('Error fetching products:', error);
            });

    }, []);

    
    const results = products;

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

    

    return (
        <div>
        <h1 >Product List</h1>
        {listItems}
        
        
    </div>
    );


}

export default ShowPromo;