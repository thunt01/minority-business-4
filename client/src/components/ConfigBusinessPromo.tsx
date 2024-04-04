import React, { useEffect, useState } from "react"; 
import Navbar from "./Navbar";

const ConfigBusinessPromo = () => {

    const [configInfo, setConfigInfo] = useState({title: "", message: "", url: ""});

    useEffect(() => {
        
    })

    function sendReq(info) {
        console.log('in sendreq function... is info working', info);
        fetch('/addBusinessPromo', {
            method: "POST", 
            body: JSON.stringify(info),
            
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }


    const handleSubmit =  (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const stuff = JSON.parse(JSON.stringify({title: configInfo.title, message: configInfo.message, url: configInfo.url}));

        console.log('stuff',stuff);
        sendReq(stuff); 
        console.log('is it this',JSON.stringify(configInfo));

       
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setConfigInfo((prevConfigInfo) => ({
          ...prevConfigInfo,
          [name]: value,
        }));
      };


    return (
        <div>
            <Navbar/>
            <form onSubmit={handleSubmit} >
                <label htmlFor = "title">Enter Ad Title</label><br/>
                <input 
                    type = "text" 
                    id = "title" 
                    name = "title" 
                    value={configInfo.title || ""}
                    onChange={handleInputChange}></input><br/>

                <label htmlFor = "message">Enter Ad Message</label><br/>
                <input 
                    type = "text" 
                    id = "message" 
                    name = "message" 
                    value = {configInfo.message || ""}
                    onChange={handleInputChange}></input><br/>

                <label htmlFor="url">Enter a URL to a landscape photo</label>
                <input 
                    type="url" 
                    name="url" 
                    id="url" 
                    placeholder="https://example.com" 
                    pattern="https://.*" 
                    value = {configInfo.url || ""}
                    onChange={handleInputChange}/>
                    
                

                
                <input type="submit" value="Submit" />

            </form>
        </div>
    );
}

export default ConfigBusinessPromo;