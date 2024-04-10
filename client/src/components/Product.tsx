import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import Navbar from './Navbar';
import Search from './Search';
import './Product.css';

const Product = () => {
    const [productName, setProduct] = useState("");
    const [productPrice, setPrice] = useState("");
    const [productDescription, setDescription] = useState("");
    const [productImage, setImage] = useState("");
    const [productURL, setURL] = useState("");
    const [businessID, setBusinessID] = useState("");
    const [businessName, setBusiness] = useState([]);

    const product_id = useParams().ProductID;
    useEffect(() => {
        fetch('/product/' + product_id)
            .then((res) => res.json())
            .then((data) => {setProduct(data.name); setPrice(data.price); setDescription(data.description); setURL(data.url); setImage(data.ImageName); setBusinessID(data.businessid);});
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
            <div className='product-info'> 
                <div>
                    <h1>{productName}</h1>
                    <img src={productImage ? "https://culture-cart-s3-images.s3.amazonaws.com/" + productImage : "https://culture-cart-s3-images.s3.amazonaws.com/blankimage.jpeg"} alt={"No Image"} height="150" />
                </div>
                <div>
                    <div>${productPrice}</div>
                    <div>{productDescription}</div>
                    <div>{productURL}</div>
                    <div>
                        <a href={`/business/${businessID}`}> {businessName} </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;