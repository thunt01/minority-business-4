import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import Navbar from './Navbar';
import Search from './Search';
import './Business.css';
import { fetchUserAttributes } from 'aws-amplify/auth';
import WishlistAddIcon from './WishlistAddIcon';


const Business = () => {
    const [businessOwnerID, setBusinessOwnerID] = useState("");
    const [isCurrentUsersBusiness, setIsCurrentUsersBusiness] = useState(false);

    const [businessName, BusinessName] = useState("");
    const [businessDescription, setDescription] = useState("");
    const [businessURL, setURL] = useState("");
    const [businessEmail, setEmail] = useState("");
    const [products, setProducts] = useState([]);

    const business_id = useParams().BusinessID;
    useEffect(() => {
        const checkUser = async () => {
            fetch('/business/' + business_id)
                .then((res) => res.json())
                .then((data) => {BusinessName(data.name); setDescription(data.description); setEmail(data.email); setURL(data.url); setBusinessOwnerID(data.ownerID)});
                const user_details = await fetchUserAttributes();
                if (user_details.sub == businessOwnerID ){
                    setIsCurrentUsersBusiness(true)
                }
        }
        checkUser();
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
            </a> 
        </li>
    ));
//onClick={handleRemoveWishlist}
    const addProductButton = (
        <a href="/ProductForm" type="button" role="button" className="btn btn-outline-secondary mb-3">
        <WishlistAddIcon/>
        </a>
    )
    
    return (
        <div>
        <Navbar></Navbar>
        <Search></Search>
            <div className="grid-container">
                <div className='dashboard'>
                    <h1 className="business-name">
                        <a href={businessURL}>
                            {businessName}
                        </a>
                    </h1>
                    <div className='products-listed'>
                        <p className='row'>
                        {isCurrentUsersBusiness ? addProductButton: addProductButton}
                        <h2 className='col-m-10'>Products</h2> 
                        </p>
                        
                        
                        {listItems}
                    </div>
                </div>
                <div className='business-info'>
                    <div className="business-description">

                        <h2 >About our business:</h2>
                        {businessDescription}
                    </div>
                    <div className="business-contact">
                        <h2>Contact us here:</h2>
                        {businessEmail}
                    </div>
                </div>
                {/* <div className='insights'>
                    <h2>Business Insights</h2>
                    <img src={require('../assets/Customer Actions from GMB.png')} alt=""></img>
                </div> */}
            </div>
        </div>
    );
}

export default Business;