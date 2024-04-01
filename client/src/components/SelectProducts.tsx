import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const SelectProducts =  () => {
    
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showOnPage, setShowOnPage] = useState(false);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(`Checkbox state: ${showOnPage}`);
        setSelectedProduct(null);
    };

    const handleCheckboxChange = (event) => {
        setShowOnPage(event.target.checked);
    };

    
    useEffect(() => {
        // Make the API call when the component mounts
        axios.get('/products')
            .then(response => {
                // Handle the successful response
                setProducts(response.data.result);
            })
            .catch(error => {
                // Handle any errors
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
                                {/* <input type="checkbox" checked={showOnPage} id ="press1" value= "show"onChange={handleCheckboxChange} />
                                 */}
                                <label className="checkbox-label">
                                    Show:
                                    <input type="checkbox" className="form-checkbox" checked={showOnPage} onChange={handleCheckboxChange} />
                                </label>

                                 
                                <button className="secondary-button"type="submit">Submit</button>
                            </form>
                        )}
                </li>
            ))}
        </ul>
        
        
    </div>
    );

    // now, I want to add something so that when you click on a search-result-item, it expands and shows a form that asks for the duration of the promo

    

            



}

export default SelectProducts;