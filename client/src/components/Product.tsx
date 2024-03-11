import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";

const Product = () => {
    const [product, setProduct] = useState("");
    const product_id = useParams().ProductID;
    useEffect(() => {
      fetch('/product/' + product_id)
        .then((res) => res.json())
        .then((data) => setProduct(data.result[0]));
    }, []);
    
    return (
        <div>
            <li>{product.Name}</li>
            <li>{product.Price}</li>
            <li>{product.Description}</li>
            <li>{product.URL}</li>
        </div>
    );
}

export default Product;