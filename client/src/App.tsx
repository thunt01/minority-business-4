import React from "react";
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing'
import Contact from './components/Contact'
import Checkout from './components/Checkout';
import Product from './components/Product';


import Login from './components/Login';
import Product from './components/Product';
import SearchResults from './components/SearchResults';

function App(){
    return (    
        <div className='App'>
                <Routes>
                    <Route path="/" element={ <Landing /> }/>
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/Checkout" element={<Checkout />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/product/:ProductID" element={ <Product /> }/>
                    <Route path="/search/:search_tag" element={ <SearchResults /> }/>
                </Routes>
        </div>
        

    )
}


export default App;