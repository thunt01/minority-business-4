import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import Search from "./components/Search.tsx";
import Home from './components/Home.tsx';
import About from './components/About.tsx';
import Contact from './components/Contact.tsx';
import Signup from "./components/Signup.tsx";
import Nav from './components/Nav.tsx';
import Checkout from './components/Checkout.tsx';

const App = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event: any) => {setSearchTerm(event.target.value)};
    return (
        <div>
            <div>
                <input
                    type="search"
                    placeholder="Search product..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <ul>
                    <Search product_name={searchTerm} />
                </ul>
            </div>
            <Nav />
            <Routes>
                <Route path="/" element={ <Home /> }/>
                <Route path="/about" element={ <About /> }/>
                <Route path="/contact" element={ <Contact /> }/>
                <Route path="/signup" element={ <Signup /> }/>
                <Route path="/checkout" element={<Checkout/>}/>
            </Routes>
        </div>
    )    
}

export default App;