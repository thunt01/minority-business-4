import React from "react";
import PickMeals from "../assets/pick-meals-image.png";
import ChooseMeals from "../assets/choose-image.png";
import DeliveryMeals from "../assets/delivery-image.png";
import THunt from "../assets/chart_with_upwards_trend.png"
import MSan from "../assets/FullSizeRender.png"
import MObi from "../assets/ObiHeadshoot.png"
import AHud from "../assets/AzHud.png"
import AMat from "../assets/FullSizeRender (1).png"

const Team = () => {
    const teamInfoData = [
      {
        image: AMat,
        title: "Scrum Master",
        text: "Kept close tabs on the overall progress of the project, as well as major contributions to the frontend.",
      },
      {
        image: MSan,
        title: "Back-End Engineer",
        text: "CultureCart helps you find the hidden gems that resonate with your unique taste",
      },
      {
        image: THunt,
        title: "Full-Stack Engineer",
        text: "Find what you're craving effortlessly. Our search engine lets you filter by location, category, and more",
      },
      {
        image: MObi,
        title: "Front-End Engineer",
        text: "Your wishlist keeps everything in reach. Bookmark your favorite products, businesses, or services",
      },
      {
        image: AHud,
        title: "Front-End Engineer",
        text: "Perfect for the modern entrepreneur. Track engagements, gather feedback, and fine-tune your offerings.",
      },

    ];
    return (
      <div className="team-section-wrapper" id="team">
        <div className="team-section-top">
          <p className="primary-subheading">Team</p>
          <h1 className="primary-heading">Meet the team</h1>
          <p className="primary-text">
          This product was made by a group of graduating computer science students from Howard University
          
          </p>
        </div>
        <div className="team-section-bottom">
  {teamInfoData.map((data) => (
    <div className="team-section-info" key={data.title}>
      <div className="info-boxes-img-container">
        <img
          src={data.image}
          alt=""
          style={{ width: '250px', height: '230px', marginRight: '10px', marginLeft:'10px', borderRadius: '30px'}}
        />
      </div>
      
      <h2>{data.title}</h2>
      <p>{data.text}</p>
    </div>
  ))}
</div>
      </div>
    );
  };


export default Team;