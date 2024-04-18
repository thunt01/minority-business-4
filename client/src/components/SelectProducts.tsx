import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const SelectProducts =  () => {
    
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        sendReq(JSON.parse(JSON.stringify({ ProductID : selectedProduct.ProductID })));
        alert('Promo updated.');
        setSelectedProduct(null);
    };

    function sendReq(info){
        fetch('/promo', {
            method: "POST",
            body: JSON.stringify(info),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }

    useEffect(() => {
        axios.get('/products')
            .then(response => {
                setProducts(response.data.result);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <div>
        <h1 >Product List</h1>
        <ul >
            {products.map(product => (
                <li key={product.ProductID} className="search-result-item" onClick={() => handleProductClick(product)}>
                    <p className="product-name">Name: {product.Name}</p>
                    <p className="product-price">Price: ${product.Price}</p>
                    <p className="product-description">Description: {product.Description}</p>
                    <button className="secondary-button" onClick={() => handleProductClick(product)}>Promo</button>
                    {selectedProduct === product && (
                            <form className='form-layout'onSubmit={handleFormSubmit}>
                                <h2>{selectedProduct.Name}</h2>
                                <button className="secondary-button"type="submit" onClick={handleFormSubmit}>Show On Home Page</button>
                            </form>
                        )}
                </li>
            ))}
        </ul>
    </div>
    );
};

export default SelectProducts;