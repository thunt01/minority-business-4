import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import './Forms.css'
//import { ImportsNotUsedAsValues } from "typescript";

//form checking (correct types, correct length, '/', "")
//*Edit so products also have foreign key: business id
//*Add photos
function ProductForm({ productID }) {

    const header = productID !==-1 ? "Update Product Information" : "Create New Product";
    const [productInfo, setProductInfo] = useState({name: "", price: "", description:"", url:""});

    useEffect(() => { 
        if (productID !==-1) {
            fetch('/product/' + productID)
            .then((res) => res.json())
            .then((data) => setProductInfo(data));
        }
    }, [productID]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setProductInfo(values => ({...values, [name]: value}))
    }

    function sendReq(info) {
        fetch('/product', {
            method: "POST",
            body: JSON.stringify(info),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (productID !== -1) {
            sendReq({...productInfo,...{id: productID }});
            console.log(JSON.stringify({...productInfo,...{id: productID }}));
            alert("Product Updated")
        }
        else {
            sendReq(productInfo);
            console.log(JSON.stringify(productInfo));
            alert("Product Created")
        }
    }

    return (
    <div className="App">
        <Navbar></Navbar>
        <h1>
            {header} 
        </h1>
        <form onSubmit={handleSubmit}>
            <label>Product Name:
                <input
                    type="text"
                    name="name"
                    value={productInfo.name || ""}
                    onChange={handleChange}
                />
            </label><br/>
            <label>Price:
                <input
                    type="text"
                    name="price"
                    value={productInfo.price || ""}
                    onChange={handleChange}
                />
            </label><br/>
            <label>Description:
                <input
                    type="text"
                    name="description"
                    value={productInfo.description || ""}
                    onChange={handleChange}
                />
            </label><br/>
            <label>URL:
                <input
                    type="text"
                    name="url"
                    value={productInfo.url || ""}
                    onChange={handleChange}
                />
            </label><br/>
            <input type="submit"/>
        </form>
    </div>
    );
}
export default ProductForm;