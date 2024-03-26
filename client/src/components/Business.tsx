import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import Navbar from './Navbar';
import Search from './Search';

const Business = () => {
    const [businessName, setBusiness] = useState("");
    const [businessDescription, setDescription] = useState("");
    const [businessEmail, setEmail] = useState("");
    const [products, setProducts] = useState([]);

    const business_id = useParams().BusinessID;
    useEffect(() => {
      fetch('/business/' + business_id)
        .then((res) => res.json())
        .then((data) => {setBusiness(data.name); setDescription(data.description); setEmail(data.email)});
    }, [business_id]);

    useEffect(() => {
        fetch('/business/products/' + business_id)
        .then((res) => res.json())
        .then((data) => {setProducts(data);})
    }, [business_id]);

    const results = JSON.parse(JSON.stringify(products));
    const listItems = results.map((product: any) => (
        <li key={product.Id}>
            <a href={`/product/${product.ProductID}`}>
                <div>{product.Name}</div>
                <div>{product.Price}</div>
                <div>{product.Description}</div> 
            </a> 
        </li>
    ));
    
    return (
        <div>
            <Navbar></Navbar>
            <Search></Search>
            <h1>{businessName}</h1>
            <h2>About our business:</h2>
            {businessDescription}
            <h2>Check us out here:</h2>
            {businessEmail}
            <h2>Listed Products</h2>
            {listItems}
        </div>
    );
}

export default Business;