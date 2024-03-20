import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";

const Product = () => {
    const [productName, setProduct] = useState("");
    const [productPrice, setPrice] = useState("");
    const [productDescription, setDescription] = useState("");
    const [productURL, setURL] = useState("");

    const product_id = useParams().ProductID;
    useEffect(() => {
      fetch('/product/' + product_id)
        .then((res) => res.json())
        .then((data) => {setProduct(data.name); setPrice(data.price); setDescription(data.description); setURL(data.url)});
    }, []);
    
    return (
        <div>
            <li>{productName}</li>
            <li>{productPrice}</li>
            <li>{productDescription}</li>
            <li>{productURL}</li>
        </div>
    );
}

export default Product;