import React from "react";
import AboutBackground from "../assets/about-background.png";
import Bison2 from "../assets/Bison2.png";

const About = () => {
    return (
      <div className="about-section-container" id="about-us">
        <div className="about-background-image-container">
          <img src={AboutBackground} alt="" />
        </div>
        <div className="about-section-image-container">
          <img src={Bison2} alt="" />
        </div>
        <div className="about-section-text-container">
          <p className="primary-subheading">About</p>
          <h1 className="primary-heading">
            Bridging the Gap for Minority-Owned Businesses 
          </h1>
          <p className="primary-text">
            In our interconnected world, fostering an inclusive and diverse marketplace is imperative. While we’ve made significant strides in advancing 
            racial equity, minority-owned businesses continue to encounter distinct hurdles. 
          </p>
          <p className="primary-text">
            We’re passionate about fostering inclusivity and supporting minority-owned businesses, 
            and our mission is to bridge the gap between customers and local entrepreneurs, 
            creating a vibrant ecosystem that celebrates diversity.
          </p>
          <div className="about-buttons-container">
            <button className="secondary-button">Learn More</button>
          </div>
        </div>
      </div>
    );
  };

export default About;