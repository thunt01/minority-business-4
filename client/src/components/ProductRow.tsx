import React, { useState, useEffect } from 'react';
import "./ProductRow.css"
import WishlistRemoveIcon from './WishlistRemoveIcon';
import WishlistAddIcon from './WishlistAddIcon';
import {fetchUserAttributes} from 'aws-amplify/auth';

const ProductRow = (props) => {

  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const checkInWishlist = async () => {
      const user_details = await fetchUserAttributes();
      fetch('/wishlist/' + user_details.sub + '/' + props.props.ProductID)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.length){
          console.log(data.length)
          setInWishlist(true);
        }
      })
    }
    checkInWishlist();
  // eslint-disable-next-line
  }, []);

  const handleAddWishlist = async () => {
    console.log("adding!")
    const user_details = await fetchUserAttributes();        
    fetch('/addToWishlist', {
      method: "POST",
      body: JSON.stringify({userID: user_details.sub, productID: props.props.ProductID}),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => console.log("response!"))
    .then((res) => console.log(res));
    setInWishlist(true);
  }

  const handleRemoveWishlist = async () => {
    const user_details = await fetchUserAttributes();        
    fetch('/deleteFromWishlist', {
      method: "POST",
      body: JSON.stringify({userID: user_details.sub, productID: props.props.ProductID}),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => console.log("response!"))
    .then((res) => console.log(res));
    setInWishlist(false);
  }
  const WishlistAdd = (
    <button type="button" className="btn btn-outline-success" onClick={handleAddWishlist}>
      <WishlistAddIcon/>
    </button>
  )
  const WishlistRemove = (
    <button type="button" className="btn btn-outline-danger" onClick={handleRemoveWishlist}>
      <WishlistRemoveIcon/>
    </button>
  )

  return (
    <div>
        <div className="row product">
          <a href={`/product/${props.props.ProductID}`} className="col-md-2 product-image">
              <img src={props.props.ImageName ? "https://culture-cart-s3-images.s3.amazonaws.com/" + props.props.ImageName : "https://culture-cart-s3-images.s3.amazonaws.com/blankimage.jpeg"} alt={""} height="150" />
          </a>
          <a href={`/product/${props.props.ProductID}`} className="col-md-8 product-detail box">
              <h4>{props.props.Name}</h4>
              <p>{props.props.Description}</p>
          </a>
          <div className="col-md-1 product-price">
              {"$" + props.props.Price}
              
          </div>
          <div className='col-md-1'>
            {inWishlist ? WishlistRemove :WishlistAdd}
          </div>
        </div>
    </div>
  );
}

export default ProductRow;