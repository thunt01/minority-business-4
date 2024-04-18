import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import {fetchUserAttributes,} from 'aws-amplify/auth';
import SellIcon from '@mui/icons-material/Sell';
import BadgeIcon from '@mui/icons-material/Badge';
import DescriptionIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import AttachFileIcon from '@mui/icons-material/AttachFile';

function ProductForm({ productID }) {

    const header = productID !==-1 ? "Update Product Information" : "Create New Product";
    const [productInfo, setProductInfo] = useState({name: "", price: "", description:"", url:"", cognitoAccountID: "", productImageName: ""});
    const [productPhoto, setProductPhoto] = useState();

    useEffect(() => { 
        const checkExistingProduct= async () => {
            const user_details = await fetchUserAttributes();
            console.log(user_details.sub)
            if (productID !==-1) {
                fetch('/product/' + productID)
                .then((res) => res.json())
                .then((data) => {
                    setProductInfo(data)
                });
            } else {
                setProductInfo(values => ({...values, cognitoAccountID: user_details.sub}))
            }
        }
        checkExistingProduct();
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value.replace("'", "''");
        setProductInfo(values => ({...values, [name]: value}))
    }

    const handleFileSelect = (event) => {
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
            <div>
            <Navbar></Navbar>
            <a href="https://front.codes/" className="logo" target="_blank"></a>

            <div className="section " >
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-0 pt-0 pt-sm-2 text-center">
                                <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="card-front">
                                    <div className="center-wrap" >
                                        <div className="section text-center">
                                        <h4 className="h4-for-forms">{header}</h4>
                                        <div className="form-group mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={productInfo.name || ""}
                                                onChange={handleChange}
                                                className="form-style text-black"
                                                placeholder="Name"
                                            />
                                            <i className="input-icon uil uil-at">
                                                <BadgeIcon></BadgeIcon>
                                            </i>
                                                                
                                        </div>
                                        <div className="form-group mt-2">
                                            <input
                                                type="text"
                                                name="price"
                                                value={productInfo.price || ""}
                                                onChange={handleChange}
                                                className="form-style text-black"
                                                placeholder="Price"
                                            />
                                            <i className="input-icon uil uil-at">
                                                <SellIcon></SellIcon>
                                            </i>
                                            
                                        </div>
                                        <div className="form-group mt-2">
                                            <input
                                                type="text"
                                                name="description"
                                                value={productInfo.description || ""}
                                                onChange={handleChange}
                                                className="form-style text-black"
                                                placeholder="Description"
                                            />
                                            <i className="input-icon uil uil-at">
                                                <DescriptionIcon></DescriptionIcon>
                                            </i>
                                        </div>
                                        <div className="form-group mt-2">
                                            <input
                                                type="text"
                                                name="url"
                                                value={productInfo.url || ""}
                                                onChange={handleChange}
                                                className="form-style text-black"
                                                placeholder="Website Url"
                                            />
                                            <i className="input-icon uil uil-at">
                                                <LinkIcon></LinkIcon>
                                            </i>
                                        </div>
                                        <div className="form-group mt-2">
                                            <input 
                                                type="file" 
                                                name="image" 
                                                accept="image/*"
                                                onChange={handleFileSelect}
                                                className="form-style text-black"
                                                placeholder="Product Image"
                                            />
                                            <i className="input-icon uil uil-at">
                                                <AttachFileIcon></AttachFileIcon>
                                            </i>
                                        </div>
                                        <a href="#" type="submit"className="secondary-button" onClick={handleSubmit}>Submit</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
export default ProductForm;