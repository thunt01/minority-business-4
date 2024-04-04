import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import './Forms.css'
import { useNavigate } from "react-router-dom";

function BusinessForm({ businessID }) {
    
    
    const header = businessID !==-1 ? "Update Business Profile" : "Create Business Profile";
    const [businessInfo, setBusinessInfo] = useState({name: "", email: "", description:"", url:""});

    const navigate = useNavigate();
    const navToSelectProducts = (event: any) => {navigate("/SelectProducts")};
    const navToConfigBusinessPromo = (event: any) => {navigate("/ConfigBusinessPromo")};

    useEffect(() => { 
        if (businessID !==-1) {
            fetch('/business/' + businessID)
            .then((res) => res.json())
            .then((data) => setBusinessInfo(data));
        }
    }, [businessID]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setBusinessInfo(values => ({...values, [name]: value}))
    }

    function sendReq(info) {
        fetch('/business', {
            method: "POST",
            body: JSON.stringify(info),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (businessID !== -1) {
            sendReq({...businessInfo,...{id: businessID }});
            console.log(JSON.stringify({...businessInfo,...{id: businessID }}));
            alert("Business Profile Updated")
        }
        else {
            sendReq(businessInfo);
            console.log(JSON.stringify(businessInfo));
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
            <input type="submit"/>
        </form>
        <div>
            {/* options to advertise */}
            <button className="secondary-button" onClick={navToSelectProducts}>Click Here to feature products</button>
            <button className= "secondary-button" onClick={navToConfigBusinessPromo}>Click Here to feature business</button>

        </div>
    </div>
    );
}
export default BusinessForm;