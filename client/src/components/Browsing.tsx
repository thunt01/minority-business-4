import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Search from './Search';
import { fetchUserAttributes } from 'aws-amplify/auth';
import ShowHighlightedProducts from './ShowHighlightedProducts';
import ProductRow from './ProductRow';
import FeaturedCarousel from './FeaturedCarousel';

const Product = () => {
    const [search_results, setResults] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    async function currentAuthenticatedUser() {
        try {
            const user_details = await fetchUserAttributes();
            setCurrentUser(user_details.email);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetch('/products')
            .then((res) => res.json())
            .then((data) => {setResults(data.result)});
    }, []);
    const results = JSON.parse(JSON.stringify(search_results));
    currentAuthenticatedUser();
    const listItems = results.map((product: any) => (
        <ProductRow props={product}></ProductRow>
    ));

    return (
        <div>
            <Navbar></Navbar>
            <Search></Search>
            <div className='m-5'>
                <h1>Exciting Businesses</h1>
                <div className='m-5'><FeaturedCarousel/></div>

                {currentUser && (
                    <div>
                        <h1>Featured Products</h1>
                        <div className='m-5'><ShowHighlightedProducts/></div>
                    </div>
                )}

                <h1>Browsing</h1>
                <div className='m-5'>{listItems} </div>
            </div>
        </div>
    );
}

export default Product;