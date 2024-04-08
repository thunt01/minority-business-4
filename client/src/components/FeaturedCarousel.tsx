import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css'
//import ExampleCarouselImage from 'components/ExampleCarouselImage';


// we need to figure out an example image situation 

const FeaturedCarousel = () => {

    const [results, setFeatures] = useState([]);


    useEffect(() => {
        // Make the API call when the component mounts
        fetch('/business')
        .then((res) => res.json())
        .then((data) => {
            setFeatures(JSON.parse(JSON.stringify(data.result)));
            console.log(data.result)
        });
        console.log('mounted');

    }, []);

    //const results = features; // we'll turn this into an array of objects for the carousel. 

    const carouselReact = results.map((business: any, index: number) => (   
        <Carousel.Item>
            <img className="d-block w-100 carousel-img" src={"https://culture-cart-s3-images.s3.amazonaws.com/" + business.ImageName}></img>
            <Carousel.Caption className="text-white bg-transparent">
                <h3>{business.Name}</h3>
                <p>{business.Description}</p>
            </Carousel.Caption>
        </Carousel.Item>
    ));
    console.log("cI",carouselReact)


    return (
        
        <Carousel>{carouselReact}</Carousel>
      );
 
}

export default FeaturedCarousel;