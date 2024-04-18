import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css'

const FeaturedCarousel = () => {

    const [results, setFeatures] = useState([]);

    useEffect(() => {
        fetch('/business')
        .then((res) => res.json())
        .then((data) => {
            setFeatures(JSON.parse(JSON.stringify(data.result)));
            console.log(data.result)
        });
        console.log('mounted');

    }, []);

    const divStyle = {
        color: "white",
        textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
      };

    const carouselReact = results.map((business: any, index: number) => (   
        <Carousel.Item>
            <img className="d-block w-100 carousel-img" alt="" src={"https://culture-cart-s3-images.s3.amazonaws.com/" + business.ImageName}></img>
            <Carousel.Caption  style={divStyle}>
                <h3 >{business.Name}</h3>
                <p >{business.Description}</p>
            </Carousel.Caption>
        </Carousel.Item>
    ));

    return (    
        <Carousel>{carouselReact}</Carousel>
    );
 
}

export default FeaturedCarousel;