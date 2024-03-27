import About from './About'
import Work from './Work'
import Footer from './Footer'
import Home from "./Home"
import React from 'react'

function Landing(){
    return (    
        <div className='Landing'>
            <Home/>
            <About/>
            <Work/>
            <Footer/>
        </div>
    )
}
export default Landing;

