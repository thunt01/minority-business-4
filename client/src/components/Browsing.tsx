import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Search from './Search';
import { fetchUserAttributes } from 'aws-amplify/auth';
import ShowPromo from './ShowPromo';
import ShowBusinessPromo from './ShowBusinessPromo';

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
        <li key={product.Id} className="search-result-item">
            <a href={`/product/${product.ProductID}`}>
                <ul>
                <li>{product.Name}</li>
                <li>{product.Price}</li>
                <li>{product.Description}</li> 
                </ul>
            </a> 
        </li>
    ));

    return (
        <div>
            <Navbar></Navbar>
            {currentUser && (
                <div>
                    hi {currentUser}
                    <h1>Featured Products</h1>
                </div>
            )}

            <Search></Search>
            
            <h1>Featured</h1>
            <ShowBusinessPromo/>

            <h1>Featured Products</h1>
            <ShowPromo/>
            

            <h1>Browsing</h1>
            {listItems}
        </div>
    );
}

export default Product;