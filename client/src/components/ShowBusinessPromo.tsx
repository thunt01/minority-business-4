import React, { useEffect, useState } from "react";
import axios from "axios";
//import Carousel from "./Carousel";
import FeaturedCarousel from "./FeaturedCarousel";


// we need to figure out an example image situation 

const ShowBusinessPromo = () => {

    const [features, setFeatures] = useState([]);

    const images = [
        'https://picsum.photos/id/1/200/300',
        'https://picsum.photos/id/20/200/300',
        'https://picsum.photos/id/23/200/300'

    ];


    useEffect(() => {
        // Make the API call when the component mounts
        axios.get('/getBusinessPromo')
            .then((response) => {
                
                
                setFeatures(JSON.parse(JSON.stringify(response.data.result)));
                console.log('successfully fetched');
                
            })
            .catch(error => {
                // Handle any errors
                console.error('Error fetching', error);
            });

    }, []);

    const results = features; // we'll turn this into an array of objects for the carousel. 

    const listItems = results.map((business: any) => (
        <li key={business.BusinessPromo_ID}>
            <a>
                <ul>
                <li>{business.Title}</li>
                <li>{business.Message}</li>
                <li>{business.ImageURL}</li> 
                </ul>
            </a> 
        </li>
    ));

    return (
        <div>
            <FeaturedCarousel/>
        </div>
      );

    
   
}

export default ShowBusinessPromo;

