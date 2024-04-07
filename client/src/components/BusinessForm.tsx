import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import './Forms.css'
import { useNavigate } from "react-router-dom";
import {
    fetchUserAttributes,
    updateUserAttribute,
    type UpdateUserAttributeOutput
  } from 'aws-amplify/auth';
import { Description } from "@mui/icons-material";
import { Button } from "@mui/material";

function BusinessForm() {
    
    
    const [businessInfo, setBusinessInfo] = useState({name: "", email: "", description:"", url:"", cognitoAccountID: "", businessImageName: "" });
    const [businessID, setBusinessID] = useState("");
    const [previewFile, setPreviewFile] = useState("");
    const [submitToggle, setSubmitToggle] = useState(false);
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
                    setBusinessInfo(data) 
                    setBusinessID(data.id)
                    setPreviewFile("https://culture-cart-s3-images.s3.amazonaws.com/" + data.businessImageName)
                });
            } else {
                setBusinessInfo({name: "", email: "", description:"", url:"", businessImageName: "", cognitoAccountID: user_details.sub})
                //setBusinessInfo(values => ({...values, cognitoAccountID: user_details.sub}))
            }
        }
        checkExistingBusiness();
    }, []);

    const header = updating ? "Update Business Profile" : "Create Business Profile";

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setBusinessInfo(values => ({...values, [name]: value}))
    }

    const handleFileSelect = (event) => {        
        setPreviewFile(URL.createObjectURL(event.target.files[0]));
        setBusinessPhoto(event.target.files[0])
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
            // Collect the confirmation code from the user and pass to confirmUserAttribute.
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
    <div className="App">
        <Navbar></Navbar>
        <h1>
            {header} 
        </h1>
        <form onSubmit={handleSubmit}>
            <label>Business Name:
                <input
                    type="text"
                    name="name"
                    value={businessInfo.name || ""}
                    onChange={handleChange}
                />
            </label><br/>
            <label>Contact Email:
                <input
                    type="text"
                    name="email"
                    value={businessInfo.email || ""}
                    onChange={handleChange}
                />
            </label><br/>
            <label>Website:
                <input
                    type="text"
                    name="url"
                    value={businessInfo.url || ""}
                    onChange={handleChange}
                />
            </label><br/>
            <label>Description:
                <input
                    type="text"
                    name="description"
                    value={businessInfo.description || ""}
                    onChange={handleChange}
                />
            </label><br/>
            <label>Product Image:
                <input 
                    type="file" 
                    name="image" 
                    accept="image/*"
                    onChange={handleFileSelect}
                />
            </label><br/>
            <img src={previewFile}/><br/>
            <input type="submit" />
        </form>
        <div>
            {/* options to advertise */}
            <button className="secondary-button" onClick={navToSelectProducts}>Click Here to feature products</button>
        <div>
        </div>
            <button className= "secondary-button" onClick={navToConfigBusinessPromo}>Click Here to feature business</button>

        </div>
    </div>
    );
}
export default BusinessForm;