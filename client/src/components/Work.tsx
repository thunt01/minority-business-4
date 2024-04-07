import React from "react";
import PickMeals from "../assets/pick-meals-image.png";
import ChooseMeals from "../assets/choose-image.png";
import DeliveryMeals from "../assets/delivery-image.png";
import Suggestions from "../assets/suggestions.png";
import Bulb from "../assets/bulb.png"
import Chart from "../assets/chart_with_upwards_trend.png"
import CrossedFingers from "../assets/crossed_fingers.png"
import Dollar from "../assets/dollar.png"
import Earth from "../assets/earth_africa.png"
import MagnifyingGlass from "../assets/mag_right.png"

const Work = () => {
    const workInfoData = [
      {
        image: Earth,
        title: "Discover",
        text: "View a profile for each business that highlights who they are and what they sell",
      },
      {
        image: Bulb,
        title: "Personalized Suggestions",
        text: "CultureCart helps you find the hidden gems that resonate with your unique taste",
      },
      {
        image: MagnifyingGlass,
        title: "Search",
        text: "Find what you're craving effortlessly. Our search engine lets you filter by location, category, and more",
      },
      {
        image: CrossedFingers,
        title: "Wishlist",
        text: "Your wishlist keeps everything in reach. Bookmark your favorite products, businesses, or services",
      },
      {
        image: Chart,
        title: "Business Owner's Hub",
        text: "Perfect for the modern entrepreneur. Track engagements, gather feedback, and fine-tune your offerings.",
      },
      {
        image: Dollar,
        title: "Advertise With Impact",
        text: "Want to boost visibility? Opt to have your profile and products featured to our engaged customer base.",
      }
    ];
    return (
      <div className="work-section-wrapper" id="work">
        <div className="work-section-top">
          <p className="primary-subheading">Work</p>
          <h1 className="primary-heading">How It Works</h1>
        </div>
        <div className="work-section-bottom">
          {workInfoData.map((data) => (
            <div className="work-section-info" key={data.title}>
              <div className="info-boxes-img-container">
                <img src={data.image} alt="" />
              </div>
              <h2>{data.title}</h2>
              <p>{data.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };


export default Work;