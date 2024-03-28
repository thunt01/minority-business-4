import React from "react";
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing'

import Product from './components/Product';
import ProductForm from './components/ProductForm';
import BusinessForm from './components/BusinessForm'
import Browsing from './components/Browsing'

import Login from './components/Login';
import SearchResults from './components/SearchResults';
import Business from './components/Business';

function App(){
    return (    
        <div className='App'>
                <Routes>
                    <Route path="/" element={ <Landing /> }/>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/ProductForm" element={ <ProductForm productID={1} /> }/>
                    <Route path="/BusinessForm" element={ <BusinessForm businessID={1} /> }/>
                    <Route path="/product/:ProductID" element={ <Product /> }/>
                    <Route path="/business/:BusinessID" element={ <Business /> }/>
                    <Route path="/search/:search_tag" element={ <SearchResults /> }/>
                    <Route path="/browsing" element={ <Browsing /> }/>
                </Routes>
        </div>
    )
}

export default App;