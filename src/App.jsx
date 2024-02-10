import React from "react";
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Nav from './components/Nav'


const App = () => {
    return (
        <main>
            <Nav />
            <Home />
            <About />
            <Contact />
        </main>
    )    
}

export default App;