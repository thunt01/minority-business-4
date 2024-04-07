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
                      <h4 className="mb-4 pb-3">Log In</h4>
                      <div className="form-group">
                        <input 
                                type = "text" 
                                className="form-style"
                                placeholder="Add a title"
                                id = "title" 
                                name = "title" 
                                value={configInfo.title || ""}
                                onChange={handleInputChange}
                                autoComplete="off">
                                
                                
                            </input>
                        <i className="input-icon uil uil-at"></i>
                      </div>  
                      <div className="form-group mt-2">
                        <input 
                                type = "text" 
                                id = "message" 
                                className="form-style"
                                placeholder="Leave a message"
                                name = "message" 
                                value = {configInfo.message || ""}
                                onChange={handleInputChange}>

                            </input>
                            <i className="input-icon uil uil-lock-alt"></i>
                      </div>
                      <div className="form-group mt-2">
                      <input 
                            type="url" 
                            name="url" 
                            id="url" 
                            className="form-style"
                            placeholder="add image (https://example.com)" 
                            pattern="https://.*" 
                            value = {configInfo.url || ""}
                            onChange={handleInputChange}/>
                            <i className="input-icon uil uil-lock-alt"></i>
                      </div>
                      <a href="#" type="submit"className="btn mt-4">submit</a>
                                    
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
        
        // <div>
        //     <Navbar/>
        //     <div className="section">
        //         <div className="container">
        //             <div className="row full-height justify-content-center">
        //                 <div className="col-12 text-center align-self-center py-5">
        //                     <div className="section pb-5 pt-5 pt-sm-2 text-center">
        //                     <form onSubmit={handleSubmit} >
        //                         <div className="form-group">
        //                             <input 
        //                                 type = "text" 
        //                                 className="form-style"
        //                                 placeholder="Add a title"
        //                                 id = "title" 
        //                                 name = "title" 
        //                                 value={configInfo.title || ""}
        //                                 onChange={handleInputChange}></input><br/>

                                
        //                         </div>
        //                         <div className="form-group">
        //                             <input 
        //                                 type = "text" 
        //                                 id = "message" 
        //                                 className="form-style"
        //                                 placeholder="Leave a message"
        //                                 name = "message" 
        //                                 value = {configInfo.message || ""}
        //                                 onChange={handleInputChange}>

        //                             </input>
        //                         </div>
                                
        //                         <div className="form-group">
        //                             <input 
        //                                 type="url" 
        //                                 name="url" 
        //                                 id="url" 
        //                                 className="form-style"
        //                                 placeholder="https://example.com" 
        //                                 pattern="https://.*" 
        //                                 value = {configInfo.url || ""}
        //                                 onChange={handleInputChange}/>


        //                         </div>


        //                     <input type="submit" value="Submit" className="btn"/>
        //                 </form>
        //                     </div>
                            
        //                 </div>




                    
        //             </div>




                    
        //         </div>

                
        //     </div>
            
        // </div>
    );
}

export default ConfigBusinessPromo;