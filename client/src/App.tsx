import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Home from './components/Home.tsx';
import About from './components/About.tsx';
import Contact from './components/Contact.tsx';
import Signup from "./components/Signup.tsx";
import Nav from './components/Nav.tsx';
import Checkout from './components/Checkout.tsx';
import Product from './components/Product.tsx';

const App = () => {
    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/" element={ <Home /> }/>
                <Route path="/about" element={ <About /> }/>
                <Route path="/contact" element={ <Contact /> }/>
                <Route path="/signup" element={ <Signup /> }/>
                <Route path="/checkout" element={ <Checkout /> }/>
                <Route path="/product/:ProductID" element={ <Product /> }/>
            </Routes>
        </div>
    )    
}

export default App;