import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Signup from "./components/Signup"
import Nav from './components/Nav'
import Checkout from './components/Checkout';
import Product from './components/Product';


const App = () => {


    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/home" element={ <Home /> }/>
                <Route path="/about" element={ <About /> }/>
                <Route path="/contact" element={ <Contact /> }/>
                <Route path="/signup" element={ <Signup /> }/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/product" element={<Product/>}/>
            </Routes>
        </div>
    )    
}

export default App;