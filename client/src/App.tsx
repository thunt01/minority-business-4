import React from "react";
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing'
import Contact from './components/Contact'
import Checkout from './components/Checkout';
import Product from './components/Product';
import ProductForm from './components/ProductForm';
import BusinessForm from './components/BusinessForm'

import Login from './components/Login';
import SearchResults from './components/SearchResults';
import Business from './components/Business';

function App(){
    return (    
        <div className='App'>
                <Routes>
                    <Route path="/" element={ <Landing /> }/>
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/Checkout" element={<Checkout />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/ProductForm" element={ <ProductForm productID={1} /> }/>
                    <Route path="/BusinessForm" element={ <BusinessForm businessID={1} /> }/>
                    <Route path="/product/:ProductID" element={ <Product /> }/>
                    <Route path="/business/:BusinessID" element={ <Business /> }/>
                    <Route path="/search/:search_tag" element={ <SearchResults /> }/>
                </Routes>
        </div>
    )
}

export default App;