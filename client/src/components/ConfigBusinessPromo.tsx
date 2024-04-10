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

      alert("Advertisement configured! Your business is now live on CultureCart 🎉")
       

       
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
            <Navbar></Navbar>
              <a href="https://front.codes/" className="logo" target="_blank">
    
  </a>

  <div className="section">
    <div className="container">
      <div className="row full-height justify-content-center">
        <div className="col-12 text-center align-self-center py-5">
          <div className="section pb-5 pt-5 pt-sm-2 text-center">
            
                  
            <div className="card-3d-wrap mx-auto">
              <div className="card-3d-wrapper">
                <div className="card-front">
                  <div className="center-wrap" >
                    <div className="section text-center">
                      <h4 className="h4-for-forms">Promotional Setup Agreement</h4>
                      
                      <div>By submitting this form, you acknowledge and 
                        agree to have your business promoted on CultureCart. 
                        This entails that all active users of our platform will 
                        have access to view your advertisement and directly access 
                        your online storefront. </div>

                      <div>
                      Rest assured, our aim is to facilitate growth and visibility 
                      for your business within our vibrant community. Should you have 
                      any concerns or require further clarification regarding the promotion of 
                      your business on CultureCart, please do not hesitate to reach out to our support 
                      team
                      </div>
                      
                      <a href="#" 
                        type="submit"
                        className="secondary-button"
                        onClick={handleSubmit}>I agree, promote my business</a>
                                    
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
        </div>
    );
}

export default ConfigBusinessPromo;