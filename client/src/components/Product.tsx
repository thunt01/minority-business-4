import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import Navbar from './Navbar';
import Search from './Search';

const Product = () => {
    const [productName, setProduct] = useState("");
    const [productPrice, setPrice] = useState("");
    const [productDescription, setDescription] = useState("");
    const [productURL, setURL] = useState("");
    const [businessID, setBusinessID] = useState("");
    const [businessName, setBusiness] = useState([]);

    const product_id = useParams().ProductID;
    useEffect(() => {
        fetch('/product/' + product_id)
            .then((res) => res.json())
            .then((data) => {setProduct(data.name); setPrice(data.price); setDescription(data.description); setURL(data.url); setBusinessID(data.businessid);});
    }, [product_id]);

    useEffect (() => {
        if (businessID) {
            fetch('/business/' + businessID)
                .then((res) => res.json())
                .then((data) => setBusiness(data.name));  
    }}, [businessID]);
    
    return (
        <div>
            <Navbar></Navbar>
            <Search></Search>
            <li>{productName}</li>
            <li>{productPrice}</li>
            <li>{productDescription}</li>
            <li>{productURL}</li>
            <li> <a href={`/business/${businessID}`}> {businessName} </a> </li>
        </div>
    );
}

export default Product;