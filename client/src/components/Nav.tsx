import React from "react";
import Search from "./Search.tsx";

const Nav = () => {
    return(
        <nav>
            <ul>
                <li><Search></Search></li>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    )    
}

export default Nav;