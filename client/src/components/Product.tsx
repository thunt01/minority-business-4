import React, { useState, useEffect } from "react";
import { ImportsNotUsedAsValues } from "typescript";


//Take in product ID as parameter
//If Product ID is found set product info values 
//Update product values in table instead of add new product to table
function Product() {
  const [users, setUsers] = useState("");
  const [productInfo, setProductInfo] = useState({name: "", price: "", description:"", url:""});


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProductInfo(values => ({...values, [name]: value}))
  }

  useEffect(() => {
    fetch('/test')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  function sendReq(info) {
    fetch('/test', {
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
    sendReq(productInfo);
    alert(JSON.stringify(productInfo));
  }

  const [searchTerm, setSearchTerm] = useState('');


  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      <h1>
        {JSON.stringify(users)}
      </h1>
      <form onSubmit={handleSubmit}>
        <label>Product Name:
          <input 
            type="text" 
            name="name"
            value={productInfo.name || ""} 
            onChange={handleChange}
          />
        </label><br/>
        <label>Price:
        <input 
            type="text" 
            name="price"
            value={productInfo.price || ""} 
            onChange={handleChange}
          />
        </label><br/>
        <label>Description:
          <input 
            type="text"
            name="description"
            value={productInfo.description || ""} 
            onChange={handleChange}
          />
        </label><br/>
        <label>URL:
          <input 
            type="text" 
            name="url"
            value={productInfo.url || ""} 
            onChange={handleChange}
          />
        </label><br/>
        <input type="submit"/>
      </form>
      <div>
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm} // create hook to fetch from database if editing existing product
          onChange={handleInputChange}
        />
        <ul>
        </ul>
        <button
            type="button"
            onClick= {() => sendReq(searchTerm)}>
                Button
        </button>
      </div>
    </div>
  );
}
export default Product;