import React from "react";
import Navbar from "./Navbar";
import CultureBannerBackground from "../assets/culture-banner-background.png"
import BannerBackground from "../assets/home-banner-background.png";
import { FiArrowRight } from "react-icons/fi";
import Product from "./Product";
//import Trending from "./Trending";
import { Link } from "react-router-dom";

// this is the home page COMPONENT, not app.tsx

const Home = () => {
  
  return (
    
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Where Community Meets Commerce
          </h1>
          <p className="primary-text">
            Imagine stepping into a world where every storefront tells a 
            unique story—a place where community thrives, creativity blossoms, 
            and innovation knows no bounds.
          </p>
          <p className="primary-text">
            Explore a vibrant tapestry of minority-owned businesses, 
            whether nestled in your neighborhood or spanning the nation. 
            From cozy cafés to boutique fashion stores and cutting-edge tech startups, 
            *I HATE that....I'm changing it as soon as I come up w something better*
            we’ve curated a diverse ecosystem just for you
          </p>
          <Link to="/Product/1" className="secondary-button" >
            Browse Now <FiArrowRight />{" "}
          </Link>
        </div>
        <div className="home-image-section">
          <img src={CultureBannerBackground} alt="" />
        </div>
      </div>
    </div>
  );
};



export default Home;