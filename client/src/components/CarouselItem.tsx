import React from "react";

const CarouselItem = ({item}) => {
    return (
        <div className="carousel-item">
            <div className="carousel-content">
                <img className="carousel-img" src = {item.photo}/>
                <div className="carousel-text">
                    <p className="carousel-statement">{item.statement}</p>
                    <p className="carousel-description">{item.description}</p>
                </div>
            </div>
        </div>
    );
}

export default CarouselItem;