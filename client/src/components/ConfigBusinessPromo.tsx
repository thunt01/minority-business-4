import React from "react"; 
import Navbar from "./Navbar";

const ConfigBusinessPromo = () => {
    const handleSubmit = () => {
      alert("Advertisement configured! Your business is now live on CultureCart 🎉");
    }
    return (
      <div>
      <Navbar></Navbar>
      <a href="https://front.codes/" className="logo" target="_blank" rel="noreferrer">_</a>

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
                        <div>
                          By submitting this form, you acknowledge and 
                          agree to have your business promoted on CultureCart. 
                          This entails that all active users of our platform will 
                          have access to view your advertisement and directly access 
                          your online storefront.
                        </div>

                        <div>
                          Rest assured, our aim is to facilitate growth and visibility 
                          for your business within our vibrant community. Should you have 
                          any concerns or require further clarification regarding the promotion of 
                          your business on CultureCart, please do not hesitate to reach out to our support 
                          team
                        </div>
                        <button 
                          type="submit"
                          className="secondary-button"
                          onClick={handleSubmit}>
                            I agree, promote my business
                        </button>
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