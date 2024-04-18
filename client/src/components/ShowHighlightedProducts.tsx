import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductRow from "./ProductRow";

const ShowHighlightedProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('/getpromo')
            .then((response) => {
                setProducts(JSON.parse(JSON.stringify(response.data.result)));
                console.log('products successfully fetched');
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });

    }, []);

    const results = products;

    const listItems = results.map((product: any) => (
        <ProductRow props={product}></ProductRow>
    ));

    return (
        <div>
            {listItems}
        </div>
    );
};

export default ShowHighlightedProducts;