import About from './About'
import Work from './Work'
import Footer from './Footer'
import Home from "./Home"
import React from 'react'
import Team from "./Team"

function Landing(){
    return (    
        <div className='Landing'>
            <Home/>
            <About/>
            <Work/>
            <Team/>
            <Footer/>
        </div>
    )
}
export default Landing;

