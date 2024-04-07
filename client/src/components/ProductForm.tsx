import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import './Forms.css'
import {fetchUserAttributes,} from 'aws-amplify/auth';
//import { ImportsNotUsedAsValues } from "typescript";

//form checking (correct types, correct length, '/', "")
//*Edit so products also have foreign key: business id
//*Add photos
function ProductForm({ productID }) {

    const header = productID !==-1 ? "Update Product Information" : "Create New Product";
    const [productInfo, setProductInfo] = useState({name: "", price: "", description:"", url:"", cognitoAccountID: "", productImageName: ""});
    //const [businessID, setBusinessID] = useState("");
    const [previewFile, setPreviewFile] = useState("");
    const [productPhoto, setProductPhoto] = useState();
    //const [updating, setUpdating] = useState(false);

    useEffect(() => { 
        const checkExistingProduct= async () => {
            const user_details = await fetchUserAttributes();
            console.log(user_details.sub)
            if (productID !==-1) {
                fetch('/product/' + productID)
                .then((res) => res.json())
                .then((data) => {
                    setProductInfo(data)
                    setPreviewFile("https://culture-cart-s3-images.s3.amazonaws.com/" + data.productImageName)
                });
            } else {
                //const user_details = await fetchUserAttributes();
                setProductInfo(values => ({...values, cognitoAccountID: user_details.sub}))
            }
        }
        checkExistingProduct();
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setProductInfo(values => ({...values, [name]: value}))
    }

    const handleFileSelect = (event) => {        
        setPreviewFile(URL.createObjectURL(event.target.files[0]));
        setProductPhoto(event.target.files[0])
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
            if (productPhoto) {
                deleteImage(productInfo.productImageName)
                putImage(productPhoto)
                .then((imageName) => {
                    const reqData = {...productInfo, productImageName: imageName}
                    setProductInfo(reqData)
                    console.log(reqData)
                    sendReq({...reqData, id: productID })
                })
                
            } else {
                sendReq({...productInfo, id: productID })
            }
            alert("Product Updated")
        }
        else {
            putImage(productPhoto)
            .then((imageName) => {
                const reqData = {...productInfo, productImageName: imageName}
                setProductInfo(reqData)
                sendReq(reqData)
            })
            alert("Product Created")
        }
    }
    async function putImage (imageFile) {
        const { url } = await fetch("/s3Url").then(res => res.json())

        await fetch(url, {
            method: "PUT",
            headers: {
            "Content-Type": "multipart/form-data"
            },
            body: imageFile
        })

        const imageUrl = url.split('?')[0]
        setProductInfo(values => ({...values, productImageName: imageUrl.substring(48).toString()}))
        return imageUrl.substring(48).toString()

    }
    async function deleteImage (imageFile) {
        fetch("/s3DeleteImage/" + imageFile)
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
            <label>Product Image:
                <input 
                    type="file" 
                    name="image" 
                    accept="image/*"
                    onChange={handleFileSelect}
                />
            </label><br/>
            <img src={previewFile}/><br/>
            <input type="submit"/>
        </form>
    </div>
    );
}
export default ProductForm;