import React from "react";
import Navbar from "./Navbar";
import CultureBannerBackground from "../assets/culture-banner-background.png"
import BannerBackground from "../assets/home-banner-background.png";
import { FiArrowRight } from "react-icons/fi";

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
            Placeholder for a short descript
          </h1>
          <p className="primary-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          </p>
          <button className="secondary-button">
            Order Now <FiArrowRight />{" "}
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