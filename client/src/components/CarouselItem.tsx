import React from "react";
// import './Carousel.css';


const CarouselItem = ({item, width}) => {


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
        
    //     <div className="carousel-item" style={{ width: width }}>
    //         <div>
    //             <img className="carousel-img" src={item.photo} />
    //             <div>
    //                 <div className="carousel-item-text">{item.statement}</div>
    //                 <div className="carousel-item-text">{item.description}</div>
    //             </div>
    //         </div>
            
            
    //   </div>
    );
}

export default CarouselItem;