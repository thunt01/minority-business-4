import React from "react";
import Navbar from "./Navbar";
import CultureBannerBackground from "../assets/culture-banner-background.png"
import BannerBackground from "../assets/home-banner-background.png";
import { FiArrowRight } from "react-icons/fi";
//import Trending from "./Trending";
import { useNavigate } from "react-router-dom";

// this is the home page COMPONENT, not app.tsx

const Home = () => {
  const navigate = useNavigate();
  const navToBrowsing = (event: any) => {navigate("/browsing")};
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
            We’ve curated a diverse ecosystem just for you
          </p>
          <button onClick={navToBrowsing} className="secondary-button" >
            Browse Now <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={CultureBannerBackground} alt="" />
        </div>
      </div>
    </div>
  );
};



export default Home;