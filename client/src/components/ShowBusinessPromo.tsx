import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowBusinessPromo = () => {

    const [features, setFeatures] = useState([]);

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

    const results = features;

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
        <div>Don't worry ... giving this a ui next
            {listItems}
        </div>
        
    )
   
}

export default ShowBusinessPromo;

