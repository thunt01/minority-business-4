import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import {
    fetchUserAttributes,
    updateUserAttribute,
    type UpdateUserAttributeOutput
  } from 'aws-amplify/auth';

import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachFileIcon from '@mui/icons-material/AttachFile';

function BusinessForm() {
    
    
    const [businessInfo, setBusinessInfo] = useState({name: "", email: "", description:"", url:"", cognitoAccountID: "", businessImageName: "" });
    const [businessPhoto, setBusinessPhoto] = useState();

    const [updating, setUpdating] = useState(false);

    const navigate = useNavigate();
    const navToSelectProducts = (event: any) => {navigate("/SelectProducts")};
    const navToConfigBusinessPromo = (event: any) => {navigate("/ConfigBusinessPromo")};

    useEffect(() => { 
        const checkExistingBusiness = async () => {
            const user_details = await fetchUserAttributes();
            if (user_details['custom:hasBusiness']) {
                setUpdating(true)
                fetch('/businessUsers/' + user_details.sub)
                .then((res) => res.json())
                .then((data) => {
                    setBusinessInfo(data);
                });
            } else {
                setBusinessInfo({name: "", email: "", description:"", url:"", businessImageName: "", cognitoAccountID: user_details.sub})
            }
        }
        checkExistingBusiness();
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value.replace("'", "''");
        setBusinessInfo(values => ({...values, [name]: value}))
    }

    const handleFileSelect = (event) => {
        setBusinessPhoto(event.target.files[0]);
      }

    async function handleUpdateUserAttribute(attributeKey: string, value: any) {
        try {
          const output = await updateUserAttribute({
            userAttribute: {
              attributeKey,
              value
            }
          });
          handleUpdateUserAttributeNextSteps(output);
        } catch (error) {
          console.log(error);
        }
      }
      function handleUpdateUserAttributeNextSteps(output: UpdateUserAttributeOutput) {
        const { nextStep } = output;
      
        switch (nextStep.updateAttributeStep) {
          case 'CONFIRM_ATTRIBUTE_WITH_CODE':
            const codeDeliveryDetails = nextStep.codeDeliveryDetails;
            console.log(
              `Confirmation code was sent to ${codeDeliveryDetails?.deliveryMedium}.`
            );
            break;
          case 'DONE':
            console.log(`attribute was successfully updated.`);
            break;
        }
      }

    async function putImage (imageFile) {
        const { url } = await fetch("/s3Url").then(res => res.json())

        await fetch(url, {
            method: "PUT",
            headers: {
            "Content-Type": "multipart/form-data"
            },
            body: imageFile
        })

        const imageUrl = url.split('?')[0]
        setBusinessInfo(values => ({...values, businessImageName: imageUrl.substring(48).toString()}))
        return imageUrl.substring(48).toString()

    }
    async function deleteImage (imageFile) {
        fetch("/s3DeleteImage/" + imageFile)
    }
    function sendReq(info) {
        fetch('/business', {
            method: "POST",
            body: JSON.stringify(info),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => console.log("response!"))
        .then((res) => console.log(res));
        const updatehasBusiness = async () => {
            handleUpdateUserAttribute('custom:hasBusiness', "1")
        }
        updatehasBusiness()
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (updating) {
            if (businessPhoto) {
                deleteImage(businessInfo.businessImageName)
                putImage(businessPhoto)
                .then((imageName) => {
                    const reqData = {...businessInfo, businessImageName: imageName}
                    setBusinessInfo(reqData)
                    sendReq(reqData)
                })
                
            } else {
                sendReq(businessInfo)
            }
            alert("Business Profile Updated")
        } else {
            putImage(businessPhoto)
            .then((imageName) => {
                const reqData = {...businessInfo, businessImageName: imageName}
                setBusinessInfo(reqData)
                sendReq(reqData)
            })
            alert("Business Profile Created")
        }
    }

    return (
        <div>
          <Navbar></Navbar>
          <a href="https://front.codes/" className="logo" target="_blank"></a>
          <div className="section " >
            <div className="container">
              <div className="row full-height justify-content-center">
                <div className="col-12 text-center align-self-center py-5">
                  <div className="section pb-0 pt-0 pt-sm-2 text-center">
                    <div className="card-3d-wrap mx-auto">
                      <div className="card-3d-wrapper">
                        <div className="card-front">
                          <div className="center-wrap" >
                            <div className="section text-center">
                              <h4 className="h4-for-forms">Update Business Profile</h4>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="name"
                                  value={businessInfo.name || ""}
                                  onChange={handleChange}
                                  className="form-style  text-black"
                                  placeholder="Business Name"
                                />
                                <i className="input-icon uil uil-at">
                                  <WorkIcon></WorkIcon>
                                </i>
                              </div>  
                              <div className="form-group mt-2">
                                <input
                                  type="text"
                                  name="email"
                                  value={businessInfo.email || ""}
                                  onChange={handleChange}
                                  className="form-style text-black"
                                  placeholder="Contact Email"
                                  />
                                  <i className="input-icon uil uil-lock-alt">
                                    <EmailIcon></EmailIcon>
                                  </i>
                              </div>
                              <div className="form-group mt-2">
                                <input
                                  type="text"
                                  name="url"
                                  value={businessInfo.url || ""}
                                  onChange={handleChange}
                                  className="form-style  text-black"
                                  placeholder="Website Url"
                                />
                                <i className="input-icon uil uil-lock-alt">
                                  <LinkIcon></LinkIcon>
                                </i>
                              </div>
                              <div className="form-group mt-2">
                                <input
                                  type="text"
                                  name="description"
                                  value={businessInfo.description || ""}
                                  onChange={handleChange}
                                  className="form-style  text-black"
                                  placeholder="Description"
                                />
                                <i className="input-icon uil uil-lock-alt">
                                  <DescriptionIcon></DescriptionIcon>
                                </i>
                              </div>
                              <div className="form-group mt-2">
                                <input 
                                  type="file" 
                                  name="image" 
                                  accept="image/*"
                                  onChange={handleFileSelect}
                                  className="form-style"
                                />
                                <i className="input-icon uil uil-lock-alt">
                                  <AttachFileIcon></AttachFileIcon>
                                </i>
                              </div>
                            <a href="#" type="submit"className="secondary-button">Submit</a>
                            <a href="#" type="submit"className="secondary-button" onClick={navToSelectProducts}>Click Here to feature products</a>
                            <a href="#" type="submit"className="secondary-button" onClick={navToConfigBusinessPromo}>Click Here to feature business</a>     
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
export default BusinessForm;